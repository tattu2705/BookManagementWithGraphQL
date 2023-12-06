import React, {useState} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useQuery, useMutation } from '@apollo/client'
import { getAuthors } from '../graphql-client/queries'
import { addSingleBook } from '../graphql-client/mutations'

const Forms = () => {
  const { loading, error, data } = useQuery(getAuthors)
  const [addBook] = useMutation(addSingleBook)
  const [newBook, setNewBook] = useState({
    name: '',
    genre: '',
    authorId: ''
  })

  const handleChange = e => {
    setNewBook({
      ...newBook,
      [e.target.name]: e.target.value
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    addBook({
      variables: {
        name: newBook.name,
        genre: newBook.genre,
        authorId: newBook.authorId
      }
    })

    setNewBook({
      name: '',
      genre: '',
      authorId: ''
    })
  }

  if (error) 
    return <p>Error :(</p>

  return (
    <Row>
      <Col>
        <Form>
          <Form.Group>
            <Form.Control type='text' placeholder='Book name' name='name' onChange={handleChange} value={newBook.name}/>
          </Form.Group>
          <Form.Group>
            <Form.Control type='text' placeholder='Book genre' name='genre' onChange={handleChange} value={newBook.genre}/>
          </Form.Group>
          <Form.Group>
            {loading ? <p>Loading...</p> :
              <Form.Control as='select' name='authorId' onChange={handleChange} defaultValue={'Select Author'}>
                <option value={''}>
                  Select Author
                </option>
                {
                  data.authors.map(author => (
                    <option value={author.id} key={author.id}>
                      {author.name}
                    </option>
                  ))
                }
              </Form.Control>

            }

          </Form.Group>
          <Button className='float-right' variant='info' onClick={handleSubmit}>
            Add Book
          </Button>
        </Form>
      </Col>
      <Col>
        <Form>
          <Form.Group>
            <Form.Control type='text' placeholder='Author name' />
          </Form.Group>
          <Form.Group>
            <Form.Control type='number' placeholder='Author age' />
          </Form.Group>
          <Button className='float-right' variant='info' type='submit'>
            Add Author
          </Button>
        </Form>
      </Col>
    </Row>
  )
}

export default Forms