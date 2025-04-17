import React, { useState, useRef, useEffect } from 'react';
import { getEnv } from '@/unitls/env';


const Component = () => {
    const apiUrl = getEnv('VITE_API_URL')
    console.log(apiUrl);
    return (
        <>
            <div>Hello</div>
        </>);
}

export default Component;