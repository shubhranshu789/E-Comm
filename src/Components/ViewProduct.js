import React, { useEffect, useState } from "react";
import "./ViewProduct.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import UpdateModal from "./UpdateModal";

import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function ViewProduct() {
  const [pic, setPic] = useState([]);

  const navigate = useNavigate();
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);



  const [modal, setModal] = useState(false);


  useEffect(() => {
    fetch("http://localhost:5000/myposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPic(result);
        // setPosts(result)
        console.log(pic);
      });
  }, []);

  const removePost = (productid) => {
    fetch(`http://localhost:5000/deleteProduct/${productid}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        notifyB(result.message);
      });
  };

  return (
    <div className="viewProduct">
      <div className="vp_main_body">
        <div className="main_body_itmes">
          {pic.map((pics) => {
            return [
              <>
                <div className="crd">
                  <Card className="item-card" style={{ width: "18rem" }}>
                    <Card.Img variant="top" src={pics.pic} />
                    <Card.Body>
                      <Card.Title>{pics.title}</Card.Title>
                      <Card.Text>{pics.desc}</Card.Text>
                      <Card.Text>{pics.price}</Card.Text>



                      <button onClick={() => setModal(true)}>
                        Open modal
                      </button>

                      <UpdateModal className='test'
                        openModal={modal}
                        closeModal={() => setModal(false)}
                      >
                        <input type="text" />
                      </UpdateModal>




                      <Button variant="primary">Update</Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          removePost(pics._id);
                        }}
                      >
                        Remove
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              </>,
            ];
          })}
        </div>
      </div>
    </div>
  );
}
