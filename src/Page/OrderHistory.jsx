import React, { useEffect, useState } from "react";

import {
  Card,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Box,
  Center,
  Divider,
  ButtonGroup,
  Avatar,
  useColorModeValue,
  StackDivider,
  Badge,
  SimpleGrid,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { CardImg, CardText, CardTitle, CardLink, Row, Col } from "reactstrap";

const OrderHistory = () => {
  const api_url = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [Item, SetItem] = useState([]);
  useEffect(() => {
    fetchorder();
  }, []);
  const fetchorder = async () => {
    try {
      const id = localStorage.getItem("id");
      const response = await fetch(`${api_url}/order/historyofcustomer`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ID: id }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch cart item");
      }
      const data = await response.json();
      console.log(data, "dfsfasfa");
      SetItem(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <Card>
              <CardHeader>
                <Heading size="md">Order History</Heading>
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  {Item &&
                    Item.data &&
                    Item.data.map((order) => (
                      <Box key={order._id} p={5} shadow="md" borderWidth="1px">
                        <Heading fontSize="l">Order ID: {order._id}</Heading>

                        <Heading
                          size="xs"
                          // textTransform="uppercase"
                        >
                          Items:{" "}
                          {order.items.map((item) => item.item.name).join(", ")}
                        </Heading>

                        <Text pt="2" fontSize="sm" colorScheme="blue">
                          Total Amount: {order.totalAmount}
                        </Text>

                        <Badge ml="1" fontSize="0.8em" colorScheme="green">
                          {order.status}
                        </Badge>
                      </Box>
                    ))}
                </Stack>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderHistory;
