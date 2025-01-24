interface HelloWorldProps {
  name: string;
}

const HelloWorld: React.FC<HelloWorldProps> = ({ name }: { name: string }) => {
  return <h1>Hello, {name}!</h1>;
};

export default HelloWorld;
