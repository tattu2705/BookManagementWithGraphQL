import { useQuery } from '@apollo/client'
import React from 'react'
import Card from 'react-bootstrap/Card'
import { getSingleBook } from '../graphql-client/queries'

const BookDetails = ({ bookId }) => {
    const { loading, error, data } = useQuery(getSingleBook, {
        variables: {
            id: bookId
        },

    })

    if (loading)
        return <p>Loading...</p>
    if (bookId !== null && error)
        return <p>Error</p>

    const book = !loading && !error ? data.book : null

    return (
        <Card bg='info' text='white' className='shadow'>
            <Card.Body>
                {
                    book ? (
                        <>
                            <Card.Title>
                                {book.name}
                            </Card.Title>
                            <Card.Subtitle>
                                {book.genre}
                            </Card.Subtitle>
                            <p>{book.author.name}</p>
                            <p>{book.author.age}</p>
                            <p>All books by this author</p>
                            <ul>
                                {
                                    book.author.books.map(book => (
                                        <li key={book.id}>
                                            {book.name}
                                        </li>
                                    ))
                                }
                            </ul>
                        </>
                    ) :
                    <p>No book selected</p>
                }
            </Card.Body>
        </Card>
    )
}

export default BookDetails