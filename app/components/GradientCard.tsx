export default function GradientCard({children}:{children:React.ReactNode}) {
  return (

<div className="group relative rounded-2xl p-[1px] bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500">

<div className="bg-white rounded-2xl p-8 h-full group-hover:bg-gray-50 transition">

{children}

</div>

</div>

  );
}