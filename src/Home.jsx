import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
function Home()
{
  const navigate=useNavigate()
  const {register,handleSubmit,formState:{errors}}=useForm()
  const onSubmit=()=>{
    navigate('/record')
  }
    return(
        <section className="container h-100">
      <div className="card my-2">
        <div className="card-header text-center">
          <h1>Welcome Our !</h1>
        </div>
        <div className="card-body p-2">
            <form onSubmit={handleSubmit(onSubmit)} className="form-control w-100">
              <label>Name</label>
              <input type="text"  
              className="form-control my-2"
              {...register('name',{
                required:'Lütfen adınızı giriniz',
                minLength:{
                  value:3,
                  message:'Adınız 3 karakterden fazla olmalıdır'
                }
              })}/>
              
              <label>Surname</label>
              <input type="text"  
              className="form-control my-2"
              {...register('surname',{
                required:'Lütfen Soyadınızı Giriniz',
                minLength:{
                  value:5,
                  message:"Soyadınız 5 karakterden az olamaz"
                }
              })}/>
              <label>Age</label>
              <input type="number"  
              className="form-control my-2"
              {...register('age',{
                required:'Lütfen Yaşnızı Giriniz'
                
                
              })}
              />
              <label>Phone</label>
              <input type="text"  
              className="form-control my-2"
              {...register('phone',{
                required:"Lütfen telefon numaranızı giriniz",
                minLength:{
                  value:11,
                  message:"Telefon numaranızı başında 0 olarak 11 haneli giriniz"
                },
                maxLength:{
                  value:11,
                  message:"Telefon numaranızı başında 0 olarak 11 haneli giriniz"
                }
               
              })}
              />
              <button className="btn btn-primary w-100">Save and Send</button>
              <ul className='list-group p-4'>
                  {errors.name && <li className='text-danger'>{errors.name.message}</li>}
                  {errors.surname && <li className='text-danger'>{errors.surname.message}</li>}
                  {errors.age && <li className='text-danger'>{errors.age.message}</li>}
                  {errors.phone && <li className='text-danger'>{errors.phone.message}</li>}

              </ul>
              
            </form>
        </div>
      </div>
    </section>
    )
}
export {Home};