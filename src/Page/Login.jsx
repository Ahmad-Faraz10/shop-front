import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, CardBody, Card, Container } from "reactstrap";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    pwd: "",
  });

  const handleonchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handlelogin = async (e, v) => {
    e.preventDefault();

    const payload = {
      username: formData.username,
      password: formData.pwd,
    };
    console.log(payload);
    try {
      const api_url = process.env.REACT_APP_BASE_URL;
      const response = await fetch(`${api_url}/user/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const results = await response.json();

      if (results.status === 1) {
        const token = results.data.token;
        localStorage.setItem("authToken", token);
        localStorage.setItem("name", payload.username);
        localStorage.setItem("id", results.data._id); //6666c4f05a7dafb68fb0a636
        console.log(results.message);
        navigate("/");
      } else {
        Swal.fire({
          title: "Invalid credentials!",
          text: results.message,
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error, "error");
    }
  };
  useEffect(() => {
    const login = localStorage.getItem("authToken");
    if (login) {
      navigate("/");
    }
  });
  return (
    <>
      <div className="account-pages ">
        <div className="background_layer pt-sm-5   min-vh-100">
          <Container className="pt-5">
            <Row className=" justify-content-center">
              <Col md={6} lg={6} xl={6}>
                <Card className=" overflow-hidden  loginCard bg-warning">
                  <CardBody className="pt-4">
                    <Row>
                      <Col lg={12} md={12} sm={12}>
                        <div className="p-2">
                          <form
                            onSubmit={handlelogin}
                            method="post"
                            className="form-horizontal login_Pageform"
                          >
                            <Row className=" gy-3">
                              <Col xl={12}>
                                <div className="mb-4">
                                  <label htmlFor="username">
                                    Username{" "}
                                    <span className="text-danger"> *</span>
                                  </label>
                                  <input
                                    name="username"
                                    type="text"
                                    onChange={handleonchange}
                                    className="form-control form-control-lg"
                                    placeholder="Enter Username"
                                    required
                                  />
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="password">
                                    Password{" "}
                                    <span className="text-danger"> *</span>
                                  </label>
                                  <input
                                    name="pwd"
                                    type="password"
                                    onChange={handleonchange}
                                    className="form-control form-control-lg"
                                    placeholder="Enter Password"
                                    required
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row className="mb-4 my-4 gy-3">
                              <div className="col-xl-12 d-grid mt-2">
                                <button
                                  className="btn  waves-effect waves-light bg-primary"
                                  type="submit"
                                >
                                  Log In{" "}
                                  <i class="fa-solid fa-arrow-right-to-bracket"></i>
                                </button>
                              </div>
                            </Row>
                          </form>
                          <p
                            className="text-center"
                            onClick={() => navigate("/Register")}
                          >
                            Register Here
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Login;
