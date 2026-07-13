import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PageLoading() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Préférences e-mail</CardTitle>
        <CardDescription>
          Ajustez vos préférences de notifications par e-mail.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-12 w-full" />
      </CardContent>
    </Card>
  );
}
