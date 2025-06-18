export declare class HealthController {
  check(): Promise<
    | {
        status: string;
        timestamp: string;
        services: {
          database: string;
        };
        error?: undefined;
      }
    | {
        status: string;
        timestamp: string;
        services: {
          database: string;
        };
        error: any;
      }
  >;
}
