import React , {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

function UserLogout() {

    const navigate = useNavigate()

    useEffect(() => {
        localStorage.clear();
        navigate('/login');
    })

    return (
        <>
            <h1>Lougout</h1>
        </>
    )
}

export default UserLogout