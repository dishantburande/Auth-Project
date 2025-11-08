import { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import AOS from "aos";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Carousel,
  Row,
  Col,
  Card,
  Button,
  Accordion,
} from "react-bootstrap";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      navigate("/login"); // Redirect to login after logout
    } catch (err) {
      setError("Logout failed. Please try again.");
    }
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <>
      {/* 🌐 Header */}
      <Navbar
        expand="lg"
        bg="light"
        className="border-bottom sticky-top shadow-sm"
      >
        <Container>
          <Navbar.Brand href="#" className="fs-2 fw-bold">
            Techno-<span className="text-primary">Web</span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto fs-5 text-center align-items-lg-center">
              <Nav.Link href="#home" className="text-primary">
                Home
              </Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <NavDropdown title="Services" id="nav-dropdown">
                <NavDropdown.Item href="#services">SEO</NavDropdown.Item>
                <NavDropdown.Item href="#services">Web Design</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#services">
                  Graphics Design
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#team">Our Team</Nav.Link>

              {/* 🔘 Logout Button */}
              <Button
                variant="outline-danger"
                size="sm"
                className="ms-lg-3 mt-2 mt-lg-0"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 🖼️ Hero Carousel */}
      <section id="home">
        <Carousel fade>
          {[
            {
              src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
              caption: "Creative Web Solutions",
              text: "We build stunning and modern web experiences.",
            },
            {
              src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
              caption: "Innovative Design",
              text: "Crafting experiences that drive results.",
            },
            {
              src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7",
              caption: "Transform Your Business",
              text: "Join us in creating the future of digital presence.",
            },
          ].map((item, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={item.src}
                alt={`Slide ${index + 1}`}
                style={{ height: "80vh", objectFit: "cover" }}
              />
              <Carousel.Caption>
                <h3>{item.caption}</h3>
                <p>{item.text}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      {/* 👨‍💻 About Section */}
      <section id="about" className="my-5">
        <Container>
          <div className="text-center mb-5">
            <h1 data-aos="fade-up">
              About <span className="text-primary">Me</span>
            </h1>
            <hr className="w-25 m-auto" />
          </div>

          <Row className="align-items-center">
            <Col md={6} data-aos="zoom-in">
              <h2>
                What Do You <span className="text-primary">Want To Know?</span>
              </h2>
              <p className="lead">
                I’m a passionate Full Stack Developer specializing in MERN
                stack, crafting responsive and scalable web applications.
              </p>
              <Button variant="primary" className="mb-4">
                More About Me
              </Button>

              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>My Hobbies</Accordion.Header>
                  <Accordion.Body>
                    Coding, design, learning, and music.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>My Qualification</Accordion.Header>
                  <Accordion.Body>
                    B.Tech in Computer Science, 3+ years of experience in web
                    development.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>My Dreams</Accordion.Header>
                  <Accordion.Body>
                    To build impactful, innovative digital solutions.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>

            <Col md={6} data-aos="fade-left" className="text-end">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                alt="About"
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* 💼 Services Section */}
      <section id="services" className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h1>
              Our <span className="text-primary">Services</span>
            </h1>
            <hr className="w-25 m-auto" />
          </div>

          <Row>
            {[
              {
                title: "Web Development",
                text: "Responsive, modern websites built with React and Node.js.",
                icon: "fa fa-code",
              },
              {
                title: "App Development",
                text: "Cross-platform mobile apps using modern frameworks.",
                icon: "fa fa-mobile",
              },
              {
                title: "Graphics Design",
                text: "Beautiful UI/UX and creative visuals.",
                icon: "fa fa-paint-brush",
              },
            ].map((service, index) => (
              <Col md={4} key={index} data-aos="zoom-in">
                <Card className="mb-4 shadow-sm">
                  <Card.Body className="text-center">
                    <i className={`${service.icon} fs-2 text-primary mb-3`} />
                    <Card.Title>{service.title}</Card.Title>
                    <Card.Text>{service.text}</Card.Text>
                    <Button variant="primary">Learn More</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* 👥 Team Section */}
      <section id="team" className="my-5 text-center">
        <Container>
          <h1>
            Our <span className="text-primary">Team</span>
          </h1>
          <hr className="w-25 m-auto mb-5" />
          <Row>
            {[
              {
                name: "Andrew",
                role: "Frontend Developer",
                img: "https://randomuser.me/api/portraits/men/32.jpg",
              },
              {
                name: "Keren",
                role: "App Developer",
                img: "https://randomuser.me/api/portraits/women/44.jpg",
              },
              {
                name: "Kristina",
                role: "Full Stack Developer",
                img: "https://randomuser.me/api/portraits/women/68.jpg",
              },
            ].map((member, i) => (
              <Col md={4} key={i} data-aos="zoom-in">
                <Card className="shadow-sm mb-4">
                  <Card.Body>
                    <img
                      src={member.img}
                      alt={member.name}
                      className="img-fluid rounded-circle border border-primary p-2"
                      width="150"
                      height="150"
                    />
                    <h5 className="mt-3">{member.name}</h5>
                    <p>{member.role}</p>
                    <Button variant="primary">Read More</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ⚡ Footer */}
      <footer className="bg-primary text-white text-center py-3 fs-5">
        Developed by <strong>Dishant Burande</strong> ©{" "}
        {new Date().getFullYear()}
      </footer>
    </>
  );
};

export default Dashboard;
