import React, {useState} from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import BookDetails from './BookDetails'
import { useQuery } from '@apollo/client'
import { getBooks } from '../graphql-client/queries'

const BookList = () => {
    const { loading, error, data } = useQuery(getBooks)
    const [selected, setSelected] = useState(null)

    if (loading)
        return <p>Loading...</p>
    if (error)
        return <p>Error :(</p>

    return (
        <Row >
            <Col xs={8}>
                <Row >
                    {
                        data.books.map(book => (
                            <Col xs={4} className='mb-3' key={book.id} onClick={() => setSelected(book.id)}>
                                <Card border="info" text="info" className='text-center shadow' >
                                    <Card.Body style={{fontSize: '16px', cursor: 'pointer'}}>
                                        {book.name}
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </Col>
            <Col xs={4}>
                <BookDetails bookId={selected}/>
            </Col>
        </Row>
    )
}

export default BookList