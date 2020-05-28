import { Route, RouteStore } from '@klasa/dashboard-hooks';
import { Duration } from '@klasa/duration';

export default class extends Route {

	constructor(store: RouteStore, dir: string, file: string[]) {
		super(store, dir, file, { route: 'application' });
	}

	get(request, response) {
		return response.json({
			users: this.client.users.size,
			guilds: this.client.guilds.size,
			channels: this.client.channels.size,
			shards: this.client.options.shardCount,
			uptime: Duration.toNow(Date.now() - (process.uptime() * 1000)),
			latency: this.client.ws.ping.toFixed(0),
			memory: process.memoryUsage().heapUsed / 1024 / 1024,
			invite: this.client.invite,
			...this.client.application
		});
	}

}
