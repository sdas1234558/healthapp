'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathology } from '@/contexts/pathology-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Clock, Star, Home } from 'lucide-react';
import type { PathologyLab } from '@/lib/pathology-types';

export default function LabLocatorPage() {
  const router = useRouter();
  const { labs, setSelectedLab } = usePathology();

  const handleSelectLab = (lab: PathologyLab) => {
    setSelectedLab(lab);
    router.push('/dashboard/labs/booking');
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Available Pathology Labs</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {labs.map((lab) => (
          <Card key={lab.id} className="p-6">
            <div className="flex flex-col space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{lab.name}</h2>
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <Star className="h-3 w-3" />
                    <span>{lab.rating}</span>
                  </Badge>
                </div>
                <Badge variant="outline" className="mt-2">
                  Report Delivery: {lab.availableTests[0].reportTime}
                </Badge>
              </div>
              
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 mt-0.5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{lab.address}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{lab.contactNumber}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{lab.openingHours}</p>
              </div>

              <div className="mt-2">
                <h3 className="font-semibold mb-2 flex items-center space-x-2">
                  <Home className="h-4 w-4" />
                  <span>Home Collection</span>
                  <Badge variant={lab.homeCollection ? "default" : "secondary"}>
                    {lab.homeCollection ? "Available" : "Not Available"}
                  </Badge>
                </h3>
              </div>

              <div className="mt-2">
                <h3 className="font-semibold mb-2">Available Tests:</h3>
                <div className="flex flex-wrap gap-2">
                  {lab.availableTests.map((test) => (
                    <Badge key={test.id} variant="secondary">
                      {test.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {lab.accreditation.length > 0 && (
                <div className="mt-2">
                  <h3 className="font-semibold mb-2">Accreditations:</h3>
                  <div className="flex flex-wrap gap-2">
                    {lab.accreditation.map((cert) => (
                      <Badge key={cert} variant="outline">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <Button
                className="w-full mt-4"
                onClick={() => handleSelectLab(lab)}
              >
                Book Tests
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {labs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No labs are currently available.
          </p>
        </div>
      )}
    </div>
  );
}