export const MAP_CENTER = [65.57591097545233, 57.10454479488743];

// const MapGL = () => {
//     React.useEffect(() => {
//         const map = new mapgl.Map('map-container', {
//             center: [65.57591097545233, 57.10454479488743],
//             zoom: 16,
//             key: '78794353-0817-4644-98d5-a9464c9daf04',
//         });
//         const marker = new mapgl.Marker(map, {
//                 coordinates: [65.57591097545233, 57.10454479488743],
//             });
//         return () => map.destroy();
//     }, []);
//     return (
//         <div className="map">
//             <MapWrapper />
//         </div>
//     );
// };

// export default MapGL;

import React, { useRef, useEffect } from 'react';
import { MapGL } from '@2gis/mapgl';

const MapComponent: React.FC = () => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<MapGL | null>(null);

    useEffect(() => {
        if (!mapContainer.current) return;

        const map = new MapGL({
            container: mapContainer.current,
            center: MAP_CENTER,
            zoom: 16,
        });

        mapInstance.current = map;

        return () => {
            map.destroy();
        };
    }, []);

    return (
        <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />
    );
};

export default MapComponent;
