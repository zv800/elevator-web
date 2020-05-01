class Stats {
    private riders = {
        riding: 0,
        ridingKg: 0,
        waiting: 0,
        served: 0,
        payments: 0,
    };
    private costs = {
        perSec: 0.01,
        perSecPerCar: 0.01,
        perFloor: 0.1,
        operating: 0
    };
    private normalRideCost = 0.25;
    private maxRecentRiderPayments = 150;
    private recentRiderPayments = [];
    private recentTripTimes = [];

    chargeRider(p, tripTime) {
        const penaltyTime = p.constrain(tripTime - 30, 0, 300);
        const rideCost = this.normalRideCost - p.map(penaltyTime, 0, 300, 0, this.normalRideCost);
        this.recentRiderPayments.push(rideCost);
        this.recentTripTimes.push(tripTime);
        if (this.recentRiderPayments.length > this.maxRecentRiderPayments) {
            this.recentRiderPayments.shift();
            this.recentTripTimes.shift();
        }
        this.riders.payments += rideCost;
    }

    addMovementCosts(numFloors, speed) {
        this.costs.operating += this.costs.perFloor * (1 + speed / 10) * numFloors;
    }

    addIdleCosts(secs, numActiveCars) {
        this.costs.operating += this.costs.perSec * secs;
        this.costs.operating += this.costs.perSecPerCar * secs * numActiveCars;
    }
}
