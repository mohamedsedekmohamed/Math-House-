import React from "react";

const Card = ({ title, link, Icon, aos = "fade-up", children }) => {
  return (
    <div data-aos={aos} className="h-fit py-4  w-200 text-center">
      <article className="group flex flex-col h-full rounded-xl bg-white shadow-md hover:shadow-xl transition overflow-hidden">
        <div className="flex h-40 w-full items-center justify-center bg-gray-100">
          {Icon && (
            <Icon className="text-6xl text-one group-hover:text-one/50 transition" />
          )}
        </div>

        {/* Text content */}
        <div className="flex flex-col flex-grow p-4">
          <a href={link}>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {title}
            </h3>
          </a>

          <div className="text-sm text-gray-500 leading-relaxed line-clamp-5">
            {children}
          </div>
        </div>
      </article>
    </div>
  );
};

export default Card;
