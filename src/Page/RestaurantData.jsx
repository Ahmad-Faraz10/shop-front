import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
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
  const items = [
    {
      src: "https://picsum.photos/id/123/1200/400",
      altText: "Slide 1",
      caption: "Slide 1",
      key: 1,
    },
    {
      src: "https://picsum.photos/id/456/1200/400",
      altText: "Slide 2",
      caption: "Slide 2",
      key: 2,
    },
    {
      src: "https://picsum.photos/id/678/1200/400",
      altText: "Slide 3",
      caption: "Slide 3",
      key: 3,
    },
  ];

  const { id } = useParams();
  const [restaurantdata, setRestaurantdata] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });

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
  // if (
  //  restaurantdata.menuItem.Rname === restaurantdata.restaurant.name &&
  //   item.category === category.name
  // ) {
  //   console.log("Found item:", item); // Debugging line
  //   return <div key={idx}>{item.name}</div>;
  // }
  const [Fitem, setFitem] = useState([""]);
  const handlechange = (e) => {
    setFitem({
      ...Fitem,
      type: e.target.name, // Assuming you want to set the name property of fitem
      value: e.target.value, // Assuming you want to set the value property of fitem
    });
  };
  const addcart = (e) => {
    const total = Fitem.price * Fitem.piece;
    const newItem = {
      ...Fitem,
      total: total,
      itemname: e.target.name,
    };

    // Retrieve existing cart items from localStorage
    const existingCartItems =
      JSON.parse(localStorage.getItem("cartItem")) || [];

    // Add the new item to existing cart items
    const updatedCartItems = [...existingCartItems, newItem];

    // Store the updated cart items back to localStorage
    localStorage.setItem("cartItem", JSON.stringify(updatedCartItems));
  };

  console.log(Fitem, "aaa");
  const CartItems = JSON.parse(localStorage.getItem("cartItem"));
  console.log(CartItems, "asasa");
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
                        {restaurantdata.menu.category === category.name}
                        {category.name}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>

                  {restaurantdata.menu &&
                    restaurantdata.menu
                      .filter(
                        (item) =>
                          item.Rname === restaurantdata.restaurant.name &&
                          item.category === category.name
                      )
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
                                        _selected={{
                                          color: "white",
                                          bg: "green",
                                        }}
                                        _hover={{
                                          color: "white",
                                          bg: "green",
                                        }}
                                        name={data.Unit}
                                        value={data.price}
                                        onClick={handlechange}
                                      >
                                        {data.Unit}
                                      </Button>
                                      <Text>{data.price}</Text>
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
                                value={Fitem.piece} // Assuming you want to bind the value of the input field to fitem.piece
                                onChange={(valueNumber) =>
                                  setFitem((prevFitem) => ({
                                    ...prevFitem,
                                    piece: valueNumber, // Assuming you want to update the piece property in fitem
                                  }))
                                }
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
                                onClick={addcart}
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
          {CartItems &&
            CartItems.map((data, index) => (
              <>
                <h2>{data.itemname}</h2>
                <h2>{data.type}</h2>
                <h2>{data.value}</h2>
                <h2>{data.piece}</h2>
                <h2>{data.total}</h2>
              </>
            ))}
        </div>
      </div>
      {/* Display restaurant data here */}
    </div>
  );
};

export default RestaurantPage;
