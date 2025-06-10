
type Props = {
    name : string;
};

export const FirstComponent = ({name}:Props) => {
  return (
    <div className="p-4 bg-blue-100 rounded-lg">
      <h1 className="text-2xl font-bold text-blue-800">Hello, {name}! 👋</h1>
      <p className="text-blue-700 mt-2">Welcome to your first React component.</p>
    </div>
  );
};
