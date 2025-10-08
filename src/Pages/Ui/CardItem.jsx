const CardItem = ({ image, title, description }) => {
  return (
    <div className="flex flex-row-reverse items-stretch gap-4 bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <img
        alt={title}
        src={image}
        className="w-20 h-20 rounded object-cover"
      />

      <div>
        <h3 className="font-medium text-gray-900 sm:text-lg">{title}</h3>
        <p className="mt-0.5 text-gray-700 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default CardItem;
