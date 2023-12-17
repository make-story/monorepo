const ReRenderTestHash = () => {
  const handle = () => {
    window.location.hash = '#newHash';
  };

  return (
    <>
      <button onClick={handle}>해시 추가</button>
    </>
  );
};

export default ReRenderTestHash;
