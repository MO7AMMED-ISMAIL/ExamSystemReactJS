import React,{useState} from 'react'
import { updateProfile } from '../../redux/authSlice';
import { useDispatch , useSelector } from 'react-redux';



function UserProfile() {

    const dispatch = useDispatch();
    const {status} = useSelector(state => state.auth);
    const [name, setName] = useState(localStorage.getItem('name'));
    const [email, setEmail] = useState(localStorage.getItem('email'));
    const [image , setImage] = useState(localStorage.getItem('image'));
    const [error , setError] = useState('');
    const [sucess , setSucess] = useState('');
    const [imageFile, setImageFile] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setImageFile(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', localStorage.getItem('id'));
        formData.append('name', name);
        formData.append('email', email);
        if (imageFile) {
            formData.append('image', imageFile);
        }
        dispatch(updateProfile(formData)).then((result) => {
            if(result.payload.status === 200){
                localStorage.setItem('name', result.payload.data.name);
                localStorage.setItem('email', result.payload.data.email);
                localStorage.setItem('image', result.payload.data.image);
                setSucess('Profile Updated Successfully');
                setError('');
            }
        }).catch((err) => {
            setError(err.message);
            setSucess('');
        });
    }

    return (
        <>
            {/* make a card from to make update the data using bootstrap */}
            {
                error && <div className='alert alert-danger'>{error}</div>
            }
            <div className='card w-full max-w-md mx-1auto mt-3' style={{ width: '30rem' }}>
                <div className='card-title text-center mt-3'>
                    <h2>User Profile</h2>
                </div>
                <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3 text-center'>
                            <img src={image} alt="Profile" className='rounded-circle' style={{ width: '150px', height: '150px' }} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="image" className='form-label'>Change Profile Picture</label>
                            <input type="file" className='form-control' id="image" accept="image/*" onChange={handleImageChange}/>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="name" className='form-label'>Name</label>
                            <input type="text" className='form-control' id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="email" className='form-label'>Email</label>
                            <input type="email" className='form-control' id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <button type="submit" className='btn btn-primary w-100'>Update Profile</button>
                    </form>
                    {
                        status === 'loading' && <div className='spinner-border text-primary mt-2' role='status'></div>
                    }
                    {
                        sucess && <div className='alert alert-success mt-2 text-center'>{sucess}</div>
                    }
                </div>
                
            </div>
        </>
    )
}

export default UserProfile