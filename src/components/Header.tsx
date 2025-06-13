interface Props {
  title: string;
  description: string;
}

function Header({ title, description }: Props) {
  return (
    <div className="bg-slate-900 text-center pt-10 mb-10 sticky top-0 z-10">
      <h1 className="text-4xl font-extrabold text-white drop-shadow-md tracking-wide">{title}</h1>
      <p className="mt-2 text-lg text-gray-400">{description}</p>
      <div className="mt-4 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 mx-auto rounded-full" />
    </div>
  );
}

export default Header;
