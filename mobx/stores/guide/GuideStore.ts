import { makeObservable, observable, runInAction, action, reaction } from 'mobx';
import { fetchGuide } from '@/api';
import { Guide, Path, Place, RootStoreType } from '@/types';
import {getTheNearestVisiblePoint, NearestPoint} from "./guide.utils";
import {cacheWrap} from "@/utils/cache_request";

export class GuideStore {
	@observable isLoading: boolean;
	@observable isFollowingToGuide: boolean;
	@observable isGuideMuted: boolean;
	@observable guide: Guide | null = null;
	@observable nearestPoint: NearestPoint | null = null;
	@observable visiblePoint: Place | null = null;
	private _followingGuide: Guide | null = null;
	
  constructor(public rootStore: RootStoreType) {
    makeObservable(this);
	  
	  // *** DEPRECATED ***
	// 	reaction(() => {
	// 		if (!this.isGuideMuted && this.isFollowingToGuide && this.visiblePoint) {
	// 			return this.guide.points.find(point => point._id === this.visiblePoint._id)
	// 		}
	// 		 return false;
	// 	}, (pointToBePlayed) => {
	// 		if (!pointToBePlayed || !pointToBePlayed.audioStory) return;
	//
	// 		this.rootStore.soundStore.playSound(pointToBePlayed.audioStory, pointToBePlayed.title)
	// 	})
	  
	  reaction(() => this.isFollowingToGuide && !!this.guide && this.rootStore.locationStore.liveCoords, (liveCoords: Path) => {
			if (!liveCoords) return;
			
			this.updateGuidePointWithLiveCoords(this.guide);
	  })
  }
	
	@action async getGuide(params: {
		slug: string;
		withStory?: boolean;
	}) {
		try {
			if (!this.rootStore.appStateStore.isNetConnected) {
				this.guide = this.rootStore.offlineStore.getGuide(params.slug);
				return;
			}
			
			
			const cachedReq = cacheWrap.apply(this, [fetchGuide, params]);
			const guide = await cachedReq.withLoading().invoke();
			
			runInAction(() => {
				this.guide = guide;
			})
		} catch (e) {}
	}
	
	@action updateGuidePointWithLiveCoords(guide: Guide) {
		const { liveCoords } = this.rootStore.locationStore;

		if (this._followingGuide?._id !== guide._id) {
			this._followingGuide = guide;
		}

		if (!this.isFollowingToGuide) {
			this.nearestPoint = null;
			return;
		}

		this.nearestPoint = getTheNearestVisiblePoint(guide.points, liveCoords);
		this.isFollowingToGuide = true;

		if (this.nearestPoint.becameVisible) {
			this.visiblePoint = this.nearestPoint.point;
		} else if (this.nearestPoint.becameVisible === false) {
			this.visiblePoint = null;
		}
	}
	
	// *** DEPRECATED ***
	// @action renewFollowingGuide(guide: Guide) {
	// 	this.isFollowingToGuide = true;
	// 	this.updateGuidePointWithLiveCoords(guide);
	// }
	
	// *** DEPRECATED ***
	// @action dropFollowingGuide() {
	// 	this.isFollowingToGuide = false;
	// 	this._followingGuide = null;
	// 	this.nearestPoint = null;
	// 	this.visiblePoint = null;
	// }
	
	@action setIsFollowingGuide(value: boolean) {
		this.isFollowingToGuide = value
	}
	
	// *** DEPRECATED ***
	// @action toggleMuteGuideSound(value?: boolean) {
	// 	const actualValue =
	// 		typeof value !== 'undefined' ? value : !this.isGuideMuted;
	//
	// 	this.isGuideMuted = actualValue;
	// }
	
	@action dropStore() {
		this.guide = null;
		this._followingGuide = null;
		this.setIsFollowingGuide(false);
		
		// *** DEPRECATED ***
		// this.dropFollowingGuide()
	}
}
