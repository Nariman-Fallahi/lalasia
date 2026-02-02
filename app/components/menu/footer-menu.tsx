import { FOOTER_MENU_PATHS } from "~/constants/paths";
import { Developers } from "~/constants/site-content";

export default function FooterMenu() {
  return (
    <>
      <div className="w-full flex justify-center mt-10">
        <div className="h-[1.5px] w-[90%] bg-[#ECE4DE]"></div>
      </div>

      <footer className="flex mt-2 p-3 flex-col lg:mt-6 lg:p-6 lg:gap-10">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col gap-3 md:w-2/3">
            <div className="flex gap-3 items-center">
              <img src="/favicon.ico" alt="" className="size-9 lg:size-12" />
              <b className="lg:text-xl">Lalasia</b>
            </div>
            <p className="font-medium text-sm text-paragraphColor lg:text-lg">
              Lalasia is digital agency that help you make better experience
              iaculis cras in.
            </p>

            <div className="mt-4 w-full flex flex-col">
              <b className="text-sm lg:text-lg">Developer</b>

              {Developers.map((item) => (
                <div
                  key={item.id}
                  className="w-[80%] p-3 mt-3 flex flex-col items-center border border-gray-300 rounded-tr-lg rounded-bl-lg lg:w-[70%] lg:mt-4"
                >
                  <div className="flex w-full justify-between items-center">
                    <p className="text-[13px] lg:text-base text-gray-800">
                      {item.fullName}
                    </p>
                    <p className="text-[13px] text-blue-500 lg:text-base">
                      {item.role}
                    </p>
                  </div>

                  <div className="flex mt-4 gap-4 lg:mt-6">
                    {item.contact.map((itemContact, indexContact) => {
                      return (
                        <a
                          target="_blank"
                          key={indexContact}
                          href={itemContact.url}
                          aria-label={item.fullName}
                        >
                          <img
                            className="ml-2 size-7 lg:size-[35px]"
                            src={itemContact.image}
                            alt={item.fullName}
                          />
                        </a>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 mt-6 justify-items-center md:mt-0 md:w-full">
            {FOOTER_MENU_PATHS.map((item) => (
              <div key={item.id} className="flex flex-col">
                <b className="lg:text-xl">{item.title}</b>

                <ul className="mt-3 flex flex-col gap-2">
                  {item.items.map((item) => (
                    <li
                      key={item.id}
                      className="text-sm font-medium text-paragraphColor line-clamp-1 lg:text-lg cursor-pointer hover:text-cyan-800 transition-all decoration-300"
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
