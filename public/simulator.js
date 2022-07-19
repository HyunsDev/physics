/* eslint-disable no-restricted-globals */


let loopId = 0
let loopTimer
let planets = {}
let speed = 1
let isPlay = true
let speedRate = 300
let trajectoryStep = 5
let trajectoryLength = 50
let shout = 0.5

let environment = {
    gravity: 9.8,
    friction: 0,
    windDrag: 0,
    windX: 0,
    windY: 0
}

const getSquaredDistance = (planet, targetPlanet) => {
    return (planet.x - targetPlanet.x)**2 + (planet.y - targetPlanet.y)**2
}

const getDistance = (planet, targetPlanet) => {
    return Math.sqrt((planet.x - targetPlanet.x)**2 + (planet.y - targetPlanet.y)**2)
}

function simulationLoop() {
    const newPlanets = {...planets}

    // 주요 로직
    for (let planetId of Object.keys(planets)) {
        const planet = newPlanets[planetId]
        if ( !planet ) continue // 삭제된 행성 계산 무시
        if ( planet.isFixed ) continue // 고정된 행성 무시
        
        // 다른 사물간의 상호작용
        for (let [targetPlanetId, targetPlanet] of Object.entries(newPlanets)) {
            if (targetPlanetId === planetId) continue

            // 충돌 감지
            if (getSquaredDistance(planet, targetPlanet) < (planet.radius + targetPlanet.radius)**2) {
                const mass = newPlanets[planetId].mass + newPlanets[targetPlanetId].mass
                continue
            }
        }

        if (loopId % trajectoryStep === 0) {
            while (Object.keys(planet.trajectory).length >= trajectoryLength) {
                planet.trajectory.shift()
            }

            planet.trajectory.push({x: planet.x, y: planet.y})
        }

        // 바람
        planet.vx += environment.windX
        planet.vy += environment.windY

        // 속도 증가
        planet.vy += environment.gravity / 1.5
        planet.x += (planet.vx * 10) / speedRate
        planet.y += (planet.vy * 10) / speedRate
        
        if (-1 * planet.y - planet.radius <= 0) {
            planet.y -= (planet.vy * 10) / speedRate
            planet.vy = -1 * planet.vy * shout
        }

        newPlanets[planetId] = planet
    }

    planets = newPlanets
    return newPlanets
}

let updateRateCount = 0
let updateRateStartTime = new Date()
const loop = () => {
    if (updateRateCount === 0) updateRateStartTime = new Date()

    if (isPlay) {
        loopId++
        const result = simulationLoop()
        self.postMessage({code: 'result', data: {
            loopId,
            newPlanets: result
        }})
    }

    updateRateCount++ 

    if (updateRateCount === 60) {
        updateRateCount = 0
        const updateRate = Math.round(60 / (new Date() - updateRateStartTime) * 1000)
        self.postMessage({code: 'ups', data: updateRate})
    }
}

const reset = () => {
    planets = {}
    loopId = 0
    loopTimer && clearInterval(loopTimer)
    loopTimer = setInterval(loop, Math.round(16.6 / speed))
    self.postMessage({code: 'speedRate', speedRate: speedRate})
}

// IO
self.addEventListener('message', event => {
    switch (event.data.code) {
        case 'ping':
            reset()
            self.postMessage({code: 'pong'})
            break

        case 'addPlanet':
            planets[event.data.data.id] = event.data.data.data
            self.postMessage({code: 'result', data: {
                loopId,
                newPlanets: planets
            }})
            break

        case 'planetList':
            loopId = 0
            planets = event.data.data
            break

        case 'updateSpeed':
            speed = event.data.data;
            loopTimer && clearInterval(loopTimer)
            loopTimer = setInterval(loop, Math.round(16 / speed))
            break

        case 'stopSimulate':
            clearInterval(loopTimer)
            break

        case 'pause':
            isPlay = false
            break

        case 'play':
            isPlay = true
            break

        case 'reset':
            reset()
            break

        case 'updateSpeedRate':
            speedRate = event.data.value
            console.log('updateSpeedRate', speedRate)
            break

        case 'updateTrajectoryStep':
            trajectoryStep = event.data.data
            break

        case 'updateTrajectoryLength':
            trajectoryLength = event.data.data
            break

        case 'SquawkYourParrot':
            self.postMessage({code: 'Squawk', data: {
                loopId,
                planets,
                speed,
                isPlay,
                speedRate,
                trajectoryStep,
                trajectoryLength
            }})
            console.log( {
                loopId,
                planets,
                speed,
                isPlay,
                speedRate,
                trajectoryStep,
                trajectoryLength
            })
            break
    
        case 'updateEnv':
            environment = event.data.data
            console.log(environment)
            break

        case 'extractReq':
            self.postMessage({code: 'extract', data: {
                planets
            }})
            break

        default:
            console.error(`Wrong Command: '${event.data.code}' `)
    }
})
