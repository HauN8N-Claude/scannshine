"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StepGoogle } from "../../onboarding/step-google";

export const GoogleLinkForm = ({
  currentPlaceId,
  currentMapsUrl,
}: {
  currentPlaceId: string | null;
  currentMapsUrl: string | null;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ma fiche Google</CardTitle>
        <CardDescription>
          {currentPlaceId
            ? "Votre fiche est connectée. Collez un nouveau lien uniquement si vous changez de fiche Google."
            : "Connectez votre fiche Google pour activer le funnel d'avis."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <StepGoogle
          currentPlaceId={currentPlaceId}
          currentMapsUrl={currentMapsUrl}
          successRedirect="/settings"
        />
      </CardContent>
    </Card>
  );
};
