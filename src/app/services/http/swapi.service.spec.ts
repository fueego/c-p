import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator';
import { PeopleSwapiInterface } from 'src/app/shared/model/interface/swapi-ppl';
import { StarshipSwapiInterface } from 'src/app/shared/model/interface/swapi-ship';
import { ErrorHandlerService } from '../error/error-handler.service';
import { SwapiService } from './swapi.service';

describe('HttpClient testing', () => {
  let spectator: SpectatorHttp<SwapiService>;
  const errorHandler = jasmine.createSpyObj('ErrorHandlerService', [
    'openSnackBar',
  ]);

  const createHttp = createHttpFactory({
    service: SwapiService,
    providers: [
      {
        provide: ErrorHandlerService,
        useValue: errorHandler,
      },
    ],
  });

  beforeEach(() => (spectator = createHttp()));

  it('should call ppl api twice', () => {
    let response: PeopleSwapiInterface[] = [];
    spectator.service.getPeopleResults(1, 2).subscribe((resp) => {
      response = resp;
    });

    const req = spectator.expectConcurrent([
      { url: 'https://swapi.dev/api/people/1', method: HttpMethod.GET },
      { url: 'https://swapi.dev/api/people/2', method: HttpMethod.GET },
    ]);

    spectator.flushAll(req, [{}, {}]);

    expect(response?.length).toBe(2);
  });

  it('should call starsShips api twice', () => {
    let response: StarshipSwapiInterface[] = [];
    spectator.service.getStarshipResults(1, 2).subscribe((resp) => {
      response = resp;
    });

    const req = spectator.expectConcurrent([
      { url: 'https://swapi.dev/api/starships/1', method: HttpMethod.GET },
      { url: 'https://swapi.dev/api/starships/2', method: HttpMethod.GET },
    ]);

    spectator.flushAll(req, [{}, {}]);

    expect(response?.length).toBe(2);
  });

  describe('--getPeople--', () => {
    it('should call getPeople with success', () => {
      let response: PeopleSwapiInterface;
      spectator.service
        .getPeople(10)
        .subscribe((resp: PeopleSwapiInterface) => {
          response = resp;
        });

      spectator
        .expectOne('https://swapi.dev/api/people/10', HttpMethod.GET)
        .flush({} as PeopleSwapiInterface, { status: 200, statusText: 'OK' });
    });

    it('should call getPeople with error', () => {
      let errorResp;
      let error = {
        status: 400,
        statusText: 'Invalid request',
      };

      spectator.service
        .getPeople(10)
        .subscribe({ error: (resp) => (errorResp = resp) });

      spectator
        .expectOne('https://swapi.dev/api/people/10', HttpMethod.GET)
        .flush('error', error);

      expect(errorHandler.openSnackBar).toHaveBeenCalled();
    });
  });

  describe('--getStarShip--', () => {
    it('should call getStarShip with success', () => {
      let response: StarshipSwapiInterface;
      spectator.service
        .getStarShip(10)
        .subscribe((resp: StarshipSwapiInterface) => {
          response = resp;
        });

      spectator
        .expectOne('https://swapi.dev/api/starships/10', HttpMethod.GET)
        .flush({} as StarshipSwapiInterface, { status: 200, statusText: 'OK' });
    });

    it('should call getStarShip with error', () => {
      let errorResp;
      let error = {
        status: 400,
        statusText: 'Invalid request',
      };

      spectator.service
        .getStarShip(10)
        .subscribe({ error: (resp) => (errorResp = resp) });

      spectator
        .expectOne('https://swapi.dev/api/starships/10', HttpMethod.GET)
        .flush('error', error);

      expect(errorHandler.openSnackBar).toHaveBeenCalled();
    });
  });
});
