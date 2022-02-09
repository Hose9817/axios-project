import {useState} from "react";
import axios from 'axios';

function App() {
    //'https://pasv-kanban.herokuapp.com/card'

    const [list, setList] = useState([])

    const getList = () => {
        axios.get('https://pasv-kanban.herokuapp.com/card')
            .then(res => {
                console.log(res)
                setList(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const deleteList = async (id) => {
        await axios.delete(`https://pasv-kanban.herokuapp.com/card/${id}`)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        getList();
    }

    const createCard = async () => {
        await axios.post('https://pasv-kanban.herokuapp.com/card/', {
            name: 'Per aspera ad astra',
            status: 'progress'
        })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        getList();
    }

    return (
        <div>
            <button onClick={getList}> Get</button>
            <button onClick={createCard}>Create card</button>

            <hr/>

            {list.map(el => <ul key={el.id}>
                <li>{el.name}</li>
                {' '}
                <li>{el.status}</li>
                <button onClick={() => deleteList(el.id)}>Delete card</button>
            </ul>)}
        </div>
    );
}

export default App;
