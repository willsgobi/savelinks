import React from 'react'
import styles from './MenuSubmit.module.css';
import { gql, useMutation } from '@apollo/client';
import { client } from '../api';

const MenuSubmit = () => {
    
    const SET_LINKS = gql`
        mutation insert($title: String!, $link: String!) {
            insert_Saved(objects: {title: $title, link: $link }) {
            affected_rows
            }
        }`;

    const [error, setError] = React.useState('');
    const [myLink, setLink] = React.useState('');
    const [myTitle, setTitle] = React.useState('');
    const [addLinks, { loading: mutationLoading, error: mutationError }] = useMutation(SET_LINKS, {client: client});

    function InsertLink(){
        setError('');
        if(myTitle === '' || myTitle === null) {
            setError('O título deve ser preenchido!');
            setTimeout(() => {setError('')}, 2000)
            return 
        }
        if(myLink === '' || myLink === null) {
            setError('O link deve ser preenchido!')
            setTimeout(() => {setError('')}, 2000)
            return 
        }

        let newLink = '';
        if(!myLink.includes('https://')){
            debugger;
            newLink = `https://${myLink}`;
            setLink(newLink);
        }

        addLinks({ variables: { title: myTitle, link: newLink }}, ).then(() => {
            if(!mutationError){
                window.location.reload();
            }
        });
        
    }

    return (
        <section>
            {error && <div className={styles.error}><p>{error}</p></div>}
            <div className={styles.submit}>
                    <input id="titulo" placeholder=" título" onKeyUp={
                        (event) => {
                            if(event.key === 'Enter'){
                                document.getElementById('link')?.focus()
                            }
                        }} 
                        onChange={({target}) => setTitle(target.value)
                        }/>
                    <input id="link" placeholder=" link" onKeyUp={
                            (event) => { 
                                if(event.key === 'Enter'){
                                    InsertLink()
                                }
                            }} 
                        onChange={({target}) => setLink(target.value)
                        }/>
                    {mutationLoading ? <button className={styles.button} disabled>Aguarde...</button> 
                    : <button className={styles.button} onClick={() => InsertLink()}>Salvar</button>}  
        </div>
        </section>
    )
}

export default MenuSubmit
