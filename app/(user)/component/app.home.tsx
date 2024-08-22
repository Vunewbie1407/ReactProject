'use client'
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
// export default function AppHome(){
//     return (
//         <Container>
      //   {/* <Carousel data-bs-theme="dark">
      //   <Carousel.Item>
      //     <img
      //       className="d-block w-100"
      //       src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfsKcLtcDvagrqCxPXwH7LG9Nddg1K83l6tQ&s"
      //       alt="First slide"
      //     />
      //     <Carousel.Caption>
      //       <h5>First slide label</h5>
      //       <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      //     </Carousel.Caption>
      //   </Carousel.Item>
      //   <Carousel.Item>
      //     <img
      //       className="d-block w-100"
      //       src="https://t4.ftcdn.net/jpg/04/79/11/23/360_F_479112366_dku6Ufwd9OVnRB3AZxonMgRzuZYeTTYY.jpg"
      //       alt="Second slide"
      //     />
      //     <Carousel.Caption>
      //       <h5>Second slide label</h5>
      //       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      //     </Carousel.Caption>
      //   </Carousel.Item>
      //   <Carousel.Item>
      //     <img
      //       className="d-block w-100"
      //       src="https://media.architecturaldigest.com/photos/57a11cbeb6c434ab487bc26b/16:9/w_1280,c_limit/nikes-senior-designer-explains-what-went-into-new-air-jordan-01.png"
      //       alt="Third slide"
      //     />
      //     <Carousel.Caption>
      //       <h5>Third slide label</h5>
      //       <p>
      //         Praesent commodo cursus magna, vel scelerisque nisl consectetur.
      //       </p>
      //     </Carousel.Caption>
      //   </Carousel.Item>
      // </Carousel> */}
//       <Row >
//         <Col md={3} style={{ marginTop: '10px' }}>
//             <CardGroup>
//             <Card>
//                 <Card.Img variant="top" src="holder.js/100px160" />
//                 <Card.Body>
//                 <Card.Title>Card title</Card.Title>
//                 <Card.Text>
//                     This is a wider card with supporting text below as a natural lead-in
//                     to additional content. This content is a little bit longer.
//                 </Card.Text>
//                 </Card.Body>
//             </Card>
//             </CardGroup>
//         </Col>
//       </Row>
//       </Container>
//     );
// }

interface IProps{
  products: IProduct[]
}

const AppHome = (props:IProps) => {
  const {products} = props;
  console.log("Check props",props);
  return (
    <Container>
      <Row>
        {products.map((product, index) => (
          <Col key={index} md={3} style={{ marginTop: '10px' }}>
            <CardGroup>
              <Card>
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    {product.price}
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
export default AppHome;