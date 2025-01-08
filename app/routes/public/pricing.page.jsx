import { Card, Button, List } from "flowbite-react";
import RegisterForm from "../auth/Register.form";
import QrCode from "@assets/qrcode.png";
export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: 0,
      cost: "per user / per month",
      features: ["3 users", "all features"],
    },
    {
      name: "Standard",
      price: 25,
      cost: "per user / per month",
      features: ["10 users", "all features"],
    },
    {
      name: "Enterprise",
      price: 100,
      cost: "per user / per month",
      features: ["100 users", "all features"],
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-8">
        <p className="text-5xl font-bold">Pricing</p>
        <p className="text-center">
          Generous pricing for every stage. Start free today, no credit card
          required.
        </p>
        <div className="flex w-full justify-center space-x-8">
          {plans.map((plan) => (
            <Card key={plan.name} className="max-w-sm w-80">
              <p className="mb-4 text-center text-4xl font-medium">
                {plan.name} plan
              </p>
              <div className="flex items-baseline justify-center text-gray-900">
                <div className="w-full text-center">
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-5xl font-extrabold tracking-tight text-primary-700">
                      ${plan.price}
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <p className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                      {plan.cost}
                    </p>
                  </div>
                </div>
              </div>
              <List>
                {plan.features.map((feature) => (
                  <List.Item key={feature}>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                      {feature}
                    </span>
                  </List.Item>
                ))}
              </List>
              <Button
                className="w-full"
                onClick={() => fillDrawer("Sign Up", <RegisterForm />)}
                color="dark"
              >
                Select plan
              </Button>
            </Card>
          ))}

          <Card className="max-w-sm w-80">
            <div className="flex flex-col items-center justify-center">
              <p className="mb-4 text-center text-4xl font-medium">
                Support us
              </p>
              <p className="text-center">
                If you like Aneko, please consider donating to support us.
              </p>

              <img src={QrCode} alt="Donate" className="size-40" />
            </div>
            <Button
              className="w-full mb-4"
              href="https://www.paypal.com/ncp/payment/4D6JXPDHNPD5Q"
              target="_blank"
              color="dark"
            >
              Donate
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
}
