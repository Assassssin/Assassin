
varvar R  R ==  6371e  ,36371e3;;  // metres// metres
varvar  φφ11  == lat1 lat1..toRadianstoRadians();();
varvar  φφ22  == lat2 lat2..toRadianstoRadians();();
varvar  ΔφΔφ  ==  ((lat2lat2--lat1lat1).).toRadianstoRadians();();
varvar  ΔλΔλ  ==  ((lon2lon2--lon1lon1).).toRadianstoRadians();();

varvar a  a ==  MathMath..sinsin(Δφ/(Δφ/22))  **  MathMath..sinsin(Δφ/(Δφ/22))  ++
               MathMath..coscos(φ(φ11))  **  MathMath..coscos(φ(φ22))  **
               MathMath..sinsin(Δλ/(Δλ/22))  **  MathMath..sinsin(Δλ/(Δλ/22););
varvar c  c ==  22  **  MathMath..atan2atan2((MathMath..sqrtsqrt((aa),),  MathMath..sqrtsqrt((11--aa));));

varvar d  d == R  R ** c c;;
