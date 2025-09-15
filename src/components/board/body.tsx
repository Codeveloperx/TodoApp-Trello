const Body = () => {
  return (
    <div className="flex gap-4">
      <div className="bg-white rounded shadow w-70 p-3">
        <h2 className="font-bold mb-2">Backlog</h2>
      </div>
      <div className="bg-white rounded shadow w-70 p-3">
        <h2 className="font-bold mb-2">To Do</h2>
      </div>
      <div className="bg-white rounded shadow w-70 p-3">
        <h2 className="font-bold mb-2">In Progress</h2>
      </div>
      <div className="bg-white rounded shadow w-70 p-3">
        <h2 className="font-bold mb-2">Done</h2>
      </div>
    </div>
  );
};

export default Body;
