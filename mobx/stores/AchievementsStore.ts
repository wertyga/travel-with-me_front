import { getTheNearestVisiblePoint } from '@/mobx/stores/guide/guide.utils';
import { action, computed, makeObservable, observable, reaction, runInAction } from 'mobx';

import { fetchReachPlaceAchievement, fetchUserAchievements } from '@/api';

import { Achievement, AchievementTypes, Path, Place, RootStoreType } from '@/types';
import { withLoading } from '@/mobx/store.utils';

export class AchievementsStore {
  @observable isLoading = false;
  @observable achievements: Record<AchievementTypes, Achievement[]> = {} as Record<AchievementTypes, Achievement[]>;
  
  // MOCK
  steps = 0;
  //
  
  constructor(public rootStore: RootStoreType) {
    makeObservable(this);
  }

  onInitiate() {
//     reaction(
//       () =>
//         this.rootStore.cityStore.currentCityPlaces.length &&
//         !!this.rootStore.userStore.user &&
//         this.rootStore.locationStore.liveCoords,
//       (liveCoords: Path) => {
//         if (!liveCoords) return;
//
//         const { point, isVisible } = getTheNearestVisiblePoint(
//           this.rootStore.cityStore.currentCityPlaces,
//           liveCoords
//         );
//
//         // MOCK
//         this.steps += 1;
//         //
// console.log({' this.steps':  this.steps, point: !!point});
//         if (!!point &&  (this.steps % 3) === 0) {
//         // if (!!point && isVisible) {
//           this.reachPlace(point);
//         }
//       }
//     );
//
//     reaction(() => this.rootStore.userStore.user, user => {
//       if (!user) return;
//
//       this.getUserAchievements()
//     })
  }
  
  @withLoading async getUserAchievements() {
    const { achievements } = await fetchUserAchievements();

    runInAction(() => {
      this.achievements = achievements;
    })
  }

  async reachPlace(place: Place) {
    if (this.isLoading) return;
    
    this.isLoading = true;
    
    try {
      const isAchievementExists = this.achievements[AchievementTypes.VisitPlace]?.find(({ entity }) => String((entity as Place)._id) === place._id);
 
      if (isAchievementExists) return;
      
      const payload = {
        placeId: place._id,
      };

      const { achievement } = await fetchReachPlaceAchievement(payload);

      runInAction((() => {
        this.updateAchievements(achievement);
      }))
    } catch (e) {
    
    } finally {
      runInAction(() => {
        this.isLoading = false;
      })
    }
  }
  
  @action updateAchievements(achievement: Achievement) {
    this.achievements = {
      ...this.achievements,
      [achievement.type]: [...(this.achievements[achievement.type] || []), achievement]
    };
  }
  
  @computed get hasAchievements() {
    return !!Object.values(this.achievements).find(values => !!values.length);
  }
  
  @computed get achievementsCount() {
    return Object.keys(this.achievements).length;
  }
  
  @action dropStore() {
    this.isLoading = false;
    this.achievements = {} as Record<AchievementTypes, Achievement[]>;
  }
}
