import React from 'react'
import styles from './DeleteView.module.css'
import { FaTrash, FaSpinner } from 'react-icons/fa'
import { gql, useMutation } from '@apollo/client';
import { client } from '../api';

interface DeleteViewProps {
    id: string
}

const DeleteView = (props: DeleteViewProps) => {
    const [error, setError] = React.useState('');
    const REMOVE_LINK = gql`
        mutation delete($id: uuid) {
        delete_Saved(where: {id: {_eq: $id}}) {
            affected_rows
        }
    }`;

    const [removeLink, { loading: mutationLoading, error: mutationError }] = useMutation(REMOVE_LINK, {client: client});

    function remove(id : string){
        setError('');
        removeLink({ variables: { id: id }}, ).then(() => {
            if(!mutationError){
                window.location.reload();
            } else {
                setError('Ocorreu um erro ao realizar a exclusão!')
            }
        });
    }

    if(mutationLoading) return <FaSpinner className={styles.spinner} />
    if(error) return <div className={styles.error}><p>{error}</p></div>
    return (
        <FaTrash className={styles.trash} onClick={() => remove(props.id)} />
    )
}

export default DeleteView
