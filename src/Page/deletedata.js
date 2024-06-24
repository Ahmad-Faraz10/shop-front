import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {

  CardImg,
  CardText,
  CardTitle,
  CardLink,
  Row,
  h2,
  Col,
  Card,
  CardHeader,
  CardImgOverlay,
} from "reactstrap";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  ButtonGroup,
  IconButton,
  Icon,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  CardBody,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  CardFooter,
} from "@chakra-ui/react";
const RestaurantPage = () => {
  const { id } = useParams();
  const [restaurantdata, setRestaurantdata] = useState([]);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    // Toggle the clicked state
    setClicked(!clicked);
  };

  useEffect(() => {
    fetchRestaurant();
    const CartItems = JSON.parse(localStorage.getItem("cartItem"));
  }, []);

  const fetchRestaurant = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/Restaurant/get/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      console.log(data);
      setRestaurantdata(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const [addCart, setaddCart] = useState({
    name: "ahmad",
    adress: "lucknow",
  });
  const [item, setItem] = useState({});
  const handlechange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    setItem((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };
  const addTocart = async () => {
    const payload = {
      name: "ahmad",
      mobile: 1234567890,
      address: "123 Main St, City, Country",
      product: {
        Restaurantname: restaurantdata.restaurant.name,
        restaurantaddress: restaurantdata.restaurant.location,
        items: [
          {
            category: "Food",
            name: "Burger",
            type: "Veg",
            price: 5.99,
            piece: 1,
            subtotal: 5.99,
          },
          {
            category: "Drink",
            name: "Soda",
            type: "Regular",
            price: 1.99,
            piece: 2,
            subtotal: 3.98,
          },
        ],
        total: 9.97,
      },
    };

    // You can now use this payload to send
  };
  console.log(addCart, "aaa");

  return (
    <div className="container">
      <div className="row">
        <div className=" col-md-9 col-lg-9">
          {restaurantdata.restaurant ? (
            <div>
              <Card inverse>
                <CardImg
                  alt="Card image cap"
                  src="https://picsum.photos/900/270?grayscale"
                  style={{
                    height: 270,
                  }}
                  width="100%"
                />
                <CardImgOverlay>
                  <CardTitle tag="h5" className="text-danger">
                    {restaurantdata.restaurant.name}
                  </CardTitle>
                  <CardText>{restaurantdata.restaurant.description}</CardText>
                  <CardText>
                    <small className="text-muted">
                      {restaurantdata.restaurant.location}
                    </small>
                  </CardText>
                </CardImgOverlay>
              </Card>
              <CardText>
                {" "}
                Opening Time: {restaurantdata.restaurant.openingTime}{" "}
              </CardText>
              <Row>
                <Col sm="6">
                  <CardLink>
                    Cost:{restaurantdata.restaurant.averageCost}
                  </CardLink>
                </Col>
                <Col sm="6">
                  <CardLink>
                    <ul className="list-unstyled d-flex justify-content-center align-items-center">
                      {[
                        ...Array(Math.floor(restaurantdata.restaurant.rating)),
                      ].map((_, index) => (
                        <li key={index} className="text-warning ">
                          <i className="fas fa-star text-center" />
                        </li>
                      ))}
                    </ul>
                  </CardLink>
                </Col>
              </Row>
            </div>
          ) : (
            <h1>loading .......</h1>
          )}
          {restaurantdata &&
            restaurantdata.categories &&
            restaurantdata.categories.map((category, index) => (
              <Accordion key={index} allowToggle>
                <AccordionItem key={index}>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        {category.name}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>

                  {restaurantdata.menu &&
                    restaurantdata.menu
                      .filter((item) => item.category === category.name)
                      .map((item, idx) => (
                        <AccordionPanel pb={4} key={idx}>
                          <Stack mt={8} direction={"row"} spacing={4}>
                            <Image
                              objectFit="cover"
                              maxW={{ base: "100%", md: "200px" }}
                              maxH={{ base: "100%", md: "200px" }}
                              src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                              alt="Caffe Latte"
                            />
                            <Stack direction={"column"} spacing={4}>
                              <Heading size="md">{item.name}</Heading>
                              <Text py="2">{item.description}</Text>
                              <Stack direction={"row"} spacing={4}>
                                {item &&
                                  item.item.map((data, index) => (
                                    <div key={index}>
                                      <Button
                                        name={`type${index}`}
                                        _selected={{
                                          color: "white",
                                          bg: clicked ? "blue" : "green",
                                        }}
                                        _hover={{
                                          color: "white",
                                          bg: "green",
                                        }}
                                        onClick={handlechange}
                                      >
                                        {data.Unit}
                                      </Button>
                                      <Text name={`price${index}`}>
                                        {data.price}
                                      </Text>
                                    </div>
                                  ))}
                              </Stack>
                            </Stack>{" "}
                            <Stack
                              direction={"column"}
                              justifyContent={"space-evenly"}
                              spacing={4}
                            >
                              <NumberInput
                                width={"150px"}
                                defaultValue={0}
                                // value={Fitem.piece}
                                onChange={(e) => console.log(e.target.value)}
                                min={0}
                                max={100}
                              >
                                <NumberInputField />
                                <NumberInputStepper>
                                  <NumberIncrementStepper />
                                  <NumberDecrementStepper />
                                </NumberInputStepper>
                              </NumberInput>
                              <Button
                                variant="solid"
                                colorScheme="blue"
                                onClick={addTocart}
                                name={item.name}
                              >
                                Add to Cart
                              </Button>
                            </Stack>
                          </Stack>
                        </AccordionPanel>
                      ))}
                </AccordionItem>
              </Accordion>
            ))}
        </div>
        <div className="col-md-3 col-lg-3">
          <h2 className="text-center">Cart</h2>
        </div>
      </div>
      {/* Display restaurant data here */}
    </div>
  );
};

export default RestaurantPage;
