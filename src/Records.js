
import { useEffect, useState} from 'react'

import axios from 'axios'

import MicRecorder from "mic-recorder-to-mp3";
function Record(){
    const recorder = new MicRecorder({ bitRate: 128 });
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const [audioFile,setAudioFile]= useState(null)
    const [isBlocked, setIsBlocked] = useState(false);
    const [status,setstatus]=useState(null)
    const [uploadstatus,setuploadstatus]=useState(null)
    let [count,setcount]=useState(10)
    let [sayac,setsayac]=useState(60)
    let [questions,setquestions]=useState()
    // Mikrofon izni alma
    useEffect(() => {
      navigator.getUserMedia(
        { audio: true },
        () => {
          console.log("Permission Granted");
          setIsBlocked(false);
        },
        () => {
          console.log("Permission Denied");
          setIsBlocked(true);
        }
      );
    }, []);
  
    const startRecording = () => {
      if (isBlocked) {
        console.log("Microphone access is blocked.");
      } else {
        recorder
          .start()
          .then(() => {
            setIsRecording(true);
            setstatus("Ses Kaydınız Dinleniyor...")
           
          })
          .catch((e) => console.error(e));
      }
    };
  
    const stopRecording = () => {
      recorder
        .stop()
        .getMp3()
        .then(([buffer, blob]) => {
          const file = new File(buffer, "audio.mp3", {
            type: blob.type,
            lastModified: Date.now(),
          });
          const audioUrl = URL.createObjectURL(file);
          setAudioFile(file)
          setAudioUrl(audioUrl);
          setIsRecording(false);
          setstatus("Ses Kaydı Tamamlandı")
          upload()
          
        })
        .catch((e) => console.log(e));
       
    };
    const upload=()=>{
        const formData = new FormData();
        formData.append("audioFile", audioFile);
    
        axios.post("http://localhost/tubitak/backend/upload.php", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(response => {
          console.log("File uploaded successfully", response.data);
          setuploadstatus(response.data.message)
        })
        .catch(error => {
          console.error("Error uploading file", error);
        });
    }
            useEffect(()=>{
                if(audioFile){
                    upload()
                }
            },[audioFile])
            useEffect(()=>{
                let intervalID=setInterval(()=>{
                    setcount(count-=1)
                    if(count==0) 
                        {
                            setcount(null)
                            setquestions("Aklınıza gelen hayvan isimlerini sesli şekilde söyleyiniz")
                            
                            clearInterval(intervalID)
                          
                            let sayacInterval=setInterval(()=>{
                                setsayac(sayac-=1)
                                if(sayac==0)
                                {
                                    setsayac(60)
                                    clearInterval(sayacInterval)
                                    
                                }
                                
                            },1000)

                        }
                },1000)
                setTimeout(()=>{
                startRecording()
                setTimeout(() => {
                    stopRecording()
                }, 61000);
                },10000)
            },[])
    return(
        <section className='container'>
           
           <h1 className='text-center'>{sayac==60?count:sayac}</h1> 
           <h2 className=''>{questions}</h2>
           <div className='card'>
            <div className='card-header'>
            {status}
            </div>
            <div className='card-body d-flex justify-content-between '>
                <audio controls src={audioUrl} />
                
            </div>
            <div className='card-footer'>
                {uploadstatus}
            </div>
           </div>
           
        </section>
    )
}
export {Record}