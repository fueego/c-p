import { fakeAsync, tick } from '@angular/core/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { Observable, of, take } from 'rxjs';
import { GameSettingsService } from 'src/app/services/data/game-settings/game-settings.service';
import { SwapiService } from 'src/app/services/http/swapi.service';
import { PeopleSwapiInterface } from 'src/app/shared/model/interface/swapi-ppl';
import { StarshipSwapiInterface } from 'src/app/shared/model/interface/swapi-ship';
import { GameWrapperComponent } from './game-wrapper.component';

describe('ButtonComponent', () => {
  const gameSettingsSpy = jasmine.createSpyObj('GameSettingsService', [
    'getRawGameSettings',
    'getGameSettingsObservable',
    'setGameSettings',
  ]);
  const swapiServiceSpy = jasmine.createSpyObj('SwapiService', [
    'getPeopleResults',
    'getStarshipResults',
  ]);

  let spectator: Spectator<GameWrapperComponent>;

  const createComponent = createComponentFactory({
    component: GameWrapperComponent,
    providers: [
      {
        provide: GameSettingsService,
        useValue: gameSettingsSpy,
      },
      {
        provide: SwapiService,
        useValue: swapiServiceSpy,
      },
    ],
    detectChanges: false,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should have a success class by default', () => {
    expect(spectator.component).toBeDefined();
  });

  describe('--handlePlayeBtn--', () => {
    it('should call getPeopleResults service', () => {
      spyOn<any>(spectator.component, 'generateRandom1to100').and.returnValue(
        10
      );
      swapiServiceSpy.getPeopleResults.and.returnValue(of([{}]));

      spectator.component.handlePlayeBtn('people');

      expect(swapiServiceSpy.getPeopleResults).toHaveBeenCalledWith(10, 10);
    });

    it('should call getStarshipResults service', () => {
      spyOn<any>(spectator.component, 'generateRandom1to100').and.returnValue(
        12
      );
      swapiServiceSpy.getStarshipResults.and.returnValue(of([{}]));

      spectator.component.handlePlayeBtn('starships');

      expect(swapiServiceSpy.getStarshipResults).toHaveBeenCalledWith(12, 12);
    });
  });

  describe('--handleResetBtn--', () => {
    it('should call setGameSettings with initial data', () => {
      spectator.component.handleResetBtn();

      expect(gameSettingsSpy.setGameSettings).toHaveBeenCalledWith(
        jasmine.objectContaining({
          gameType: 'people',
          player1Score: 0,
          player2Score: 0,
        })
      );
    });

    it('should trigger next function call with null value for peopleResp$ subject', fakeAsync(() => {
      let peopleResp = null;
      spectator.component.handleResetBtn();

      spectator.tick(1);
      spectator.component.peopleResp$.pipe(take(1)).subscribe((resp) => {
        peopleResp = resp;
        expect(peopleResp).toBeNull();
      });
    }));
  });

  describe('--updateResults--', () => {
    it('should add new score for player1', () => {
      gameSettingsSpy.getRawGameSettings.and.returnValue({
        player1Score: 0,
        player2Score: 0,
        gameType: 'people',
      });

      const mockResp = [
        { mass: '100' },
        { mass: '80' },
      ] as PeopleSwapiInterface[];

      spectator.component.updateResults<PeopleSwapiInterface>(mockResp, 'mass');

      expect(gameSettingsSpy.setGameSettings).toHaveBeenCalledWith(
        jasmine.objectContaining({
          player1Score: 1,
        })
      );
    });

    it('should add new score for player2', () => {
      gameSettingsSpy.getRawGameSettings.and.returnValue({
        player1Score: 0,
        player2Score: 0,
        gameType: 'people',
      });

      const mockResp = [
        { mass: '80' },
        { mass: '100' },
      ] as PeopleSwapiInterface[];

      spectator.component.updateResults<PeopleSwapiInterface>(mockResp, 'mass');

      expect(gameSettingsSpy.setGameSettings).toHaveBeenCalledWith(
        jasmine.objectContaining({
          player2Score: 1,
        })
      );
    });

    it('should add new score for player1 and player2', () => {
      gameSettingsSpy.getRawGameSettings.and.returnValue({
        player1Score: 0,
        player2Score: 0,
        gameType: 'people',
      });

      const mockResp = [
        { mass: '80' },
        { mass: '80' },
      ] as PeopleSwapiInterface[];

      spectator.component.updateResults<PeopleSwapiInterface>(mockResp, 'mass');

      expect(gameSettingsSpy.setGameSettings).toHaveBeenCalledWith(
        jasmine.objectContaining({
          player1Score: 1,
          player2Score: 1,
        })
      );
    });
  });

  describe('--updateResults--', () => {
    it('should return numbers from strings', () => {
      const mockResp = [
        { crew: '80' },
        { crew: '81' },
      ] as StarshipSwapiInterface[];

      const resp = spectator.component.getStatistics(mockResp, 'crew');

      expect(resp[0]).toBe(80);
      expect(resp[1]).toBe(81);
    });

    it('should return 0 from strings when string is not a number', () => {
      const mockResp = [
        { crew: '80' },
        { crew: 'test' },
      ] as StarshipSwapiInterface[];

      const resp = spectator.component.getStatistics(mockResp, 'crew');

      expect(resp[0]).toBe(80);
      expect(resp[1]).toBe(0);
    });
  });

  it('should trigger generateResultsForPpl and forward response data in peopleResp$', fakeAsync(() => {
    spyOn<any>(spectator.component, 'updateResults').and.callFake(() => {});
    swapiServiceSpy.getPeopleResults.and.returnValue(
      of([{ mass: '80' }, { mass: '90' }]) as Observable<PeopleSwapiInterface[]>
    );
    spectator.component.handlePlayeBtn('people');
    let peopleResp: PeopleSwapiInterface[] | null = [];

    spectator.tick(1);
    spectator.component.peopleResp$.pipe(take(1)).subscribe((resp) => {
      peopleResp = resp;
      expect(peopleResp?.length).toBe(2);
      expect(peopleResp && peopleResp[0].mass).toBe('80');
      expect(peopleResp && peopleResp[1].mass).toBe('90');
    });
  }));

  it('should trigger generateResultsForShips and forward response data in starshipsResp$', fakeAsync(() => {
    spyOn<any>(spectator.component, 'updateResults').and.callFake(() => {});
    swapiServiceSpy.getPeopleResults.and.returnValue(
      of([{ crew: '1000' }, { crew: '8' }]) as Observable<
        StarshipSwapiInterface[]
      >
    );
    spectator.component.handlePlayeBtn('people');
    let starhsipResp: StarshipSwapiInterface[] | null = [];

    spectator.tick(1);
    spectator.component.starshipsResp$.pipe(take(1)).subscribe((resp) => {
      starhsipResp = resp;
      expect(starhsipResp?.length).toBe(2);
      expect(starhsipResp && starhsipResp[0].crew).toBe('80');
      expect(starhsipResp && starhsipResp[1].crew).toBe('90');
    });
  }));
});
