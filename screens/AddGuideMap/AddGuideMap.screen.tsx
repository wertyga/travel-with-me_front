import { useState } from 'react';

import { MainLayout } from '@/Layouts';
import Button from '@/components/Button';
import { Modal } from '@/components/Common/Modal/Modal';
import { MapBoxView } from '@/components/Map';
import { useParams } from '@/hooks';
import { PointDescriptionForm } from '@/screens/AddGuideMap/components/PointDescriptionForm';

import { Path, SCREENS } from '@/types';

export type TPointToAdd = {
  _id: string;
  images: string[];
  title: string;
  description: string;
  coords: Path;
};

export const AddGuideMapScreen = () => {
  const { title, description, city } = useParams<SCREENS.AddGuideMap>();

  const [points, setPoints] = useState([]);
  const [currentPoint, setCurrentPoint] = useState<Partial<TPointToAdd> | null>(
    null
  );
  const [state, setState] = useState({
    isModalShown: false,
  });

  const onAddNewPoint = ({ geometry }: GeoJSON.Feature) => {
    setCurrentPoint({
      _id: Math.random().toString(),
      coords: {
        lng: (geometry as any).coordinates[0],
        lat: (geometry as any).coordinates[1],
      },
    });
    setState(prev => ({ ...prev, isModalShown: true }));
  };

  const handleCloseModal = () => {
    setState(prev => ({ ...prev, isModalShown: false }));
  };

  const submitPointForm = (point: TPointToAdd) => {
    handleCloseModal();

    setPoints(prev => [...prev, { ...point, image: point.images?.[0] }]);
  };

  const onPointPress = (point: TPointToAdd) => {
    setCurrentPoint(point);
    setState(prev => ({ ...prev, isModalShown: true }));
  };

  const handleRemovePoint = () => {
    setPoints(prev => prev.filter(p => p._id !== currentPoint._id));
    handleCloseModal();
  };

  return (
    <MainLayout headerTitle="Add your points">
      <MapBoxView<TPointToAdd>
        points={points}
        initialCoords={[city.coords.lng, city.coords.lat]}
        zoomLevel={10}
        onMapPress={onAddNewPoint}
        onPress={onPointPress}
      />

      <Modal
        visible={state.isModalShown}
        onClose={handleCloseModal}
        titleSlot={
          currentPoint?.title ? (
            <Button rectangle filled onPress={handleRemovePoint}>
              Remove
            </Button>
          ) : null
        }
      >
        <PointDescriptionForm onSubmit={submitPointForm} point={currentPoint} />
      </Modal>
    </MainLayout>
  );
};
