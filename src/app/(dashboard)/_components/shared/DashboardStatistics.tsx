import { Card, CardContent } from "@/components/ui/card";
import { IStatisticItem } from "@/interface/dashboard.interface";

const DashboardStatistics = ({ items }: { items: IStatisticItem[] }) => {
  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.title}
            className="!shadow-2xl ring-0 bg-primary/10 rounded-md "
          >
            <CardContent className="flex items-center justify-center gap-5">
              <div className="flex  items-center justify-center rounded-full bg-primary/5">
                <Icon className="size-10 text-primary" />
              </div>
              <p className="text-xl  font-bold text-primary">{item.title}</p>

              <p className="text-2xl font-bold">{item.value}</p>

              <p className=" text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStatistics;
