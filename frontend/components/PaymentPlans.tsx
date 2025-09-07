import { formatPrice } from "@/utils/formatPrice";

interface PaymentPlan {
  down_payment: number;
  installments: number;
  installment_amount: number;
}

interface PaymentPlansProps {
  plans: PaymentPlan[];
  price: number;
}

export default function PaymentPlans({ plans, price }: PaymentPlansProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Payment Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg space-y-4"
          >
            <div className="flex justify-between items-center pb-4 border-b">
              <div>
                <p className="text-gray-600">Down Payment</p>
                <p className="text-xl font-bold">{plan.down_payment}%</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">Amount</p>
                <p className="text-xl font-bold text-primary">
                  {formatPrice((price * plan.down_payment) / 100)} EGP
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center pb-4 border-b">
              <div>
                <p className="text-gray-600">Installments</p>
                <p className="text-xl font-bold">{plan.installments} Months</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">Monthly</p>
                <p className="text-xl font-bold text-primary">
                  {formatPrice(plan.installment_amount)} EGP
                </p>
              </div>
            </div>

            <div>
              <p className="text-gray-600">Total Price</p>
              <p className="text-2xl font-bold text-primary">
                {formatPrice(price)} EGP
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
