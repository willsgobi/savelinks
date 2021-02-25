import React from 'react'
import styles from './ViewLinks.module.css';
import { gql, useQuery } from '@apollo/client';
import { client } from '../api';
import { FaCopy, FaSpinner, FaExternalLinkSquareAlt } from 'react-icons/fa';
import MenuSubmit from './MenuSubmit';
import DeleteView from './DeleteView';

interface SavedLinks {
    id: string,
    title: string,
    link: string,
    createdAt: Date,
    updatedAt: Date
}

interface SavedLinksData {
    Saved: SavedLinks[];
}


const GET_SAVED_LINKS = gql`
query MyQuery {
    Saved(order_by: {created_at: asc}) {
      id
      title
      link
      created_at
      updated_at
    }
  }`;


const ViewLinks = () => {

    const { loading, data } = useQuery<SavedLinksData>(
        GET_SAVED_LINKS,
        {
            client: client
        }
    );

      
    const [showMessage, setShowMessage] = React.useState(false);
    const [add, setAdd] = React.useState(false);
    const [tooltip, setTooltip] = React.useState('');

    function addTooltip(e: string){
        setTooltip(e);
    }

    
    function removeTooltip(){
        setTooltip('');
    }
    
    return (
        <section className={`${styles.content}`}>
            { showMessage &&
                <div className={`${showMessage && styles.message}`}>Copiado com sucesso!</div>
            }
            {loading ? (
            <FaSpinner className={styles.spinner}/>
            ) : <div className={styles.helperLinks}>{data && data.Saved.map(e => (

                  <div className={styles.savedLinks} key={e.id} >
                        <div className={styles.divTitle} onMouseEnter={() => addTooltip(e.id)} onMouseLeave={() => removeTooltip()}>
                            <p>{e.title}</p>
                        </div>
                        <div className={`${tooltip === e.id ? styles.tooltip: styles.hidden}`}><p>{e.link}</p></div>
                        {/* <div className={styles.divLink}>
                            <p>{e.link}</p>
                        </div> */}
                        <div className={styles.divActions}>
                            <FaCopy className={styles.copy} onClick={() => {
                                navigator.clipboard.writeText(e.link); 
                                setShowMessage(true); 
                                setTimeout(() => setShowMessage(false), 2000)
                                }} />
                            <DeleteView id={e.id}/>
                            <a href={e.link} target="__blank"><FaExternalLinkSquareAlt className={styles.open}/></a>
                        </div>
                  </div>
                
              ))}</div>}
              <div onClick={() => setAdd(!add)} className={styles.divAdd}>
                  <p>Add</p>
              </div>
              {add &&
                <MenuSubmit />
            }

        </section>
    )
}

export default ViewLinks
