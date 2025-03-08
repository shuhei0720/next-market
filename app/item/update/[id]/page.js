"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UpdateItem = (context) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
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
        `http://localhost:3001/api/item/update/${params.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title: title,
            price: price,
            image: image,
            description: description,
            email: "dummy@gmail.com",
          }),
        }
      );
      const jsonData = await response.json();
      alert(jsonData.message);
      router.push("/");
    } catch (err) {
      alert("アイテム編集失敗");
    }
  };
  return (
    <div>
      <h1>アイテム編集</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          name="title"
          placeholder="アイテム名"
          required
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="text"
          name="price"
          placeholder="価格"
          required
        />
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          type="text"
          name="image"
          placeholder="画像"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          rows={15}
          placeholder="商品説明"
          required
        ></textarea>
        <button>編集</button>
      </form>
    </div>
  );
};

export default UpdateItem;
