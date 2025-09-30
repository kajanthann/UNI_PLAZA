import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Header(){
    return(
        <>
        <nav className="bg-white shadow-md m-0">
            <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 text-xl font-bold">
                        My logo
                    </div>
                <div className='flex space-x-20'>
                    <a href="" className="font-medium">Home</a>
                    <a href="" className="font-medium">Events</a>
                    <a href="" className="font-medium">About Us</a>
                    <a href="" className="font-medium">Give a feedback</a>
                </div>
                <div className='flex justify-end space-x-10'>
                    <button>
                        <FontAwesomeIcon icon={faSearch}/>
                    </button>
                    <button className='bg-skyblue px-3 py-2 text-white rounded-2xl'>Clubs</button>
                    <button className='bg-skyblue px-3 py-2 text-white rounded-2xl'>Students</button>
                </div>
                </div>
            </div>
        </nav>
        
        </>
        
    )
}