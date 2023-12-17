import React, { useState, useEffect } from 'react';

const Index = () => {
  const uploadFile = async (file: any) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    console.log(res);
  };

  const handleChangeFile = (event: any) => {
    const [file] = [...event.target.files];
    uploadFile(file);
  };

  return (
    <>
      <div>
        <h1>테스트1</h1>
        <input
          id='input-file'
          type='file'
          accept='image/png, image/jpeg'
          onChange={handleChangeFile}
        />
        <label htmlFor='input-file'>파일 탐색</label>
      </div>

      <div>
        <h1>테스트2</h1>
        <form>
          <label className='signup-profileImg-label' htmlFor='profileImg'>
            프로필 이미지 추가
          </label>
          <input
            className='signup-profileImg-input'
            type='file'
            accept='image/*'
            id='profileImg'
          />
        </form>
      </div>
    </>
  );
};

export default Index;
