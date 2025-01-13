import { fillDrawer } from "@/components/QDrawer.ui";
import RegisterForm from "@/routes/auth/register.form";
import { Carousel } from "flowbite-react";
import Icon from "@assets/icon.png";

export default function Home() {
  return (
    <div className="flex items-center justify-center">
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
          <div className="mr-auto place-self-center lg:col-span-7">
            <div className="flex">
              <img src={Icon} className="h-14 w-14" alt="icon" />
              <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
                chieving Excellence
              </h1>
            </div>
            <p className="mb-6 max-w-2xl font-light md:text-lg lg:mb-8 lg:text-xl">
              Experience a comprehensive solution designed to help businesses
              achieve excellence in various aspects of their operations. It
              offers a wide range of tools and resources that cover everything
              from strategic planning to process improvement, risk management,
              and more. With this solution, businesses might streamline their
              operations, reduce costs, increase efficiency, and ultimately,
              achieve greater success.
            </p>

            <button
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
              onClick={() => fillDrawer(<RegisterForm />, "Sign Up")}
            >
              Sign Up
            </button>
          </div>
          <div className="hidden lg:col-span-5 lg:mt-0 lg:flex">
            <Carousel>
              {/* <img src={City} alt="city" />
    <img src={Expert} alt="expert" />
    <img src={Flowchart} alt="flowchart" />
    <img src={Dashboard} alt="dashboard" /> */}
            </Carousel>
          </div>
        </div>
      </section>
    </div>
  );
}
