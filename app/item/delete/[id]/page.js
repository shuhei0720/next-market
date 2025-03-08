"use client";

import useAuth from "@/app/utils/useAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DeleteItem = (context) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const loginUserEmail = useAuth();
  useEffect(() => {
    const getSingleItem = async () => {
      const params = await context.params;
      const response = await fetch(
        `http://localhost:3001/api/item/readsingle/${params.id}`
      );
      const jsonData = await response.json();
      const singleItem = jsonData.singleItem;
      setTitle(singleItem.title);
      setPrice(singleItem.price);
      setImage(singleItem.image);
      setDescription(singleItem.description);
      setEmail(singleItem.email);
    };
    getSingleItem();
  }, [context]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = await context.params;
    try {
      const response = await fetch(
        `http://localhost:3001/api/item/delete/${params.id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            email: loginUserEmail,
          }),
        }
      );
      const jsonData = await response.json();
      alert(jsonData.message);
      router.push("/");
    } catch (err) {
      alert("アイテム削除失敗");
    }
  };
  if (loginUserEmail === email) {
    return (
      <div>
        <h1>アイテム削除</h1>
        <form onSubmit={handleSubmit}>
          <h2>{title}</h2>
          <Image
            src={image}
            width={750}
            height={500}
            alt="item-image"
            priority
          />
          <h3>\{price}</h3>
          <p>{description}</p>
          <button>削除</button>
        </form>
      </div>
    );
  } else {
    return <h1>権限がありません</h1>;
  }
};

export default DeleteItem;
