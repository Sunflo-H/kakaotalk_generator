import React, { useContext, useRef, useState } from "react";
import styles from "../../css/TalkGenerator.module.css";
import { BiMessageRoundedAdd } from "react-icons/bi";
import { MdAddPhotoAlternate } from "react-icons/md";
import { TalkContext } from "../../context/TalkContext";
import { BsCheckLg } from "react-icons/bs";

export default function TalkGenerator() {
  const { addMessage } = useContext(TalkContext);

  const [inputs, setInputs] = useState({ mine: "", other: "" });
  const [images, setImages] = useState({ mine: "", other: "" });

  const handleInputTextChange = (e) => {
    const owner = e.target.dataset.owner;
    setInputs({ ...inputs, [owner]: e.target.value });
  };

  // 이때 이미지파일을 파일리더로 읽은 결과를 담는다.
  /**
   * 1. input에 이미지를 업로드
   * 2. 업로드한 파일의 정보를 변수에 담는다. file =  e.target.files[0];
   * 3. 파일 리더 생성 const reader = new FileReader();
   * 4. 파일리더의 url에 파일정보를 담는다. readAsDataURL(file)
   * 5. 리더가 로드되면 reader.result를 img의 src로 입력
   */
  const handleInputImageChange = (e) => {
    // const owner = e.target.dataset.owner;
    const file = e.target.files[0];
    const reader = new FileReader();
    const owner = e.currentTarget.dataset.owner;
    const image = images[owner];
    const type = "image";

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      // setImages({ ...images, [owner]: reader.result });
      addMessage(reader.result, owner, type);
      setImages({ ...images, [owner]: "" });
    };
  };

  const handleAddMessageBtnClick = (e) => {
    const owner = e.currentTarget.dataset.owner;
    const text = inputs[owner];
    const type = "text";
    addMessage(text, owner, type);
    setInputs({ ...inputs, [owner]: "" });
  };

  const handleAddImageBtnClick = (e) => {
    const owner = e.currentTarget.dataset.owner;
    const image = images[owner];
    const type = "image";
    addMessage(image, owner, type);
    setImages({ ...images, [owner]: "" });
  };

  const handleKeyDown = (e) => {
    const owner = e.currentTarget.dataset.owner;
    const text = inputs[owner];
    const type = "text";
    if (e.key === "Enter") {
      addMessage(text, owner, type);
      setInputs({ ...inputs, [owner]: "" });
    }
  };

  return (
    <div className={styles["talk-generators"]}>
      <div className={styles.generator}>
        <div className={styles["header"]}>My Talk</div>
        <div className={styles.main}>
          <label htmlFor="my_message">Message </label>
          <div className={styles.flex}>
            <input
              type="text"
              id="my_message"
              placeholder="메세지 입력"
              value={inputs.mine}
              data-owner="mine"
              onChange={handleInputTextChange}
              onKeyDown={handleKeyDown}
            />
            <button
              className={styles.add}
              data-owner="mine"
              onClick={handleAddMessageBtnClick}
            >
              <BiMessageRoundedAdd className={styles.icons} />
            </button>
          </div>
          <label htmlFor="my_image">Image</label>
          <div className={styles.flex}>
            <input
              type="file"
              accept="image/*"
              id="my_image"
              data-owner="mine"
              value={images.mine}
              onChange={handleInputImageChange}
            />
            {/* <button
              className={styles.add}
              data-owner="mine"
              onClick={handleAddImageBtnClick}
            >
              <MdAddPhotoAlternate className={styles.icons} />
            </button> */}
          </div>
        </div>
      </div>
      <div className={styles.generator}>
        <div className={styles["header"]}>Other Talk</div>
        <div className={styles.main}>
          <label htmlFor="other_message">Message </label>
          <div className={styles.flex}>
            <input
              type="text"
              id="other_message"
              placeholder="메세지 입력"
              value={inputs.other}
              data-owner="other"
              onChange={handleInputTextChange}
              onKeyDown={handleKeyDown}
            />
            <button
              className={styles.add}
              data-owner="other"
              onClick={handleAddMessageBtnClick}
            >
              <BiMessageRoundedAdd className={styles.icons} />
            </button>
          </div>
          <label htmlFor="other_image">Image</label>
          <div className={styles.flex}>
            <input
              type="file"
              accept="image/*"
              id="other_image"
              data-owner="other"
              value={images.other}
              onChange={handleInputImageChange}
            />
            {/* <button
              className={styles.add}
              data-owner="other"
              onClick={handleAddImageBtnClick}
            >
              <MdAddPhotoAlternate className={styles.icons} />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
