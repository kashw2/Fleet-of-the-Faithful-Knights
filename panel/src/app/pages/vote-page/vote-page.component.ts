import {Component, OnInit} from '@angular/core';
import {Set} from 'immutable';
import {HyperlinkMap} from '@ffk/lib-angular';
import {Option, Some} from 'funfix-core';
import {Ballot, Candidate, Group, Vote} from '@ffk/lib-ts';
import * as moment from 'moment';
import {UserService} from '../../service/user.service';
import {StarCitizenOrganisation, StarCitizenUser} from '@ffk/lib-external';
import {BehaviorSubject} from 'rxjs';
import {NavigationService} from '../../service/navigation.service';

@Component({
  selector: 'app-vote-page',
  templateUrl: './vote-page.component.html',
  styleUrls: ['./vote-page.component.scss'],
})
export class VotePageComponent implements OnInit {

  constructor(
    readonly userService: UserService,
    readonly navigationService: NavigationService,
  ) {
  }

  showVoteView: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  getBallots(): Set<Ballot> {
    return this.getVote()
      .map(v => v.getBallots())
      .getOrElse(Set<Ballot>());
  }

  getBrandImage(): Option<string> {
    return Some('assets/images/Fleet_of_the_Faithful_Knights_Shield.png');
  }

  getBrandImageRedirectUrl(): Option<string> {
    return Some('home');
  }

  getCandidate(): Option<Candidate> {
    return this.getVote()
      .flatMap(v => v.getCandidate());
  }

  getCandidateAvatar(): Option<string> {
    return this.getCandidate()
      .flatMap(c => c.getAvatar());
  }

  getCandidateDiscordDiscriminator(): Option<string> {
    return this.getCandidate()
      .flatMap(c => c.getDiscordDiscriminator());
  }

  getCandidateDiscordId(): Option<string> {
    return this.getCandidate()
      .flatMap(c => c.getDiscordId());
  }

  getCandidateDiscordUsername(): Option<string> {
    return this.getCandidate()
      .flatMap(c => c.getDiscordUsername());
  }

  getCandidateGroupColour(): Option<string> {
    return this.getCandidate()
      .flatMap(c => c.getGroup())
      .flatMap(g => g.getColour());
  }

  getCandidateGroupLabel(): Option<string> {
    return this.getCandidate()
      .flatMap(c => c.getGroup())
      .flatMap(g => g.getLabel());
  }

  getCandidateId(): Option<string> {
    return this.getCandidate()
      .flatMap(c => c.getId());
  }

  getCandidateStarCitizenBio(): Option<string> {
    return this.getCandidate()
      .flatMap(c => c.getStarCitizenUser())
      .flatMap(scu => scu.getBio());
  }

  getCandidateStarCitizenUsername(): Option<string> {
    return this.getCandidate()
      .flatMap(c => c.getStarCitizenUser())
      .flatMap(scu => scu.getUsername());
  }

  getCandidateUsername(): Option<string> {
    return this.getCandidate()
      .flatMap(c => c.getDiscordUsername());
  }

  getChatText(): Option<string> {
    return Some('Chat');
  }

  getHyperlinkMap(): Set<HyperlinkMap> {
    return Set.of(
      new HyperlinkMap(Some('Home'), Some('home')),
      new HyperlinkMap(Some('Panel'), Some('voting-panel')),
    );
  }

  getStarCitizenText(): Option<string> {
    return Some('Star Citizen');
  }

  getUserProfile(userId: Option<string>): Option<string> {
    return userId.map(id => `profile/${id}`);
  }

  getVote(): Option<Vote> {
    return Option.of(
      new Vote(
        Some('1'),
        this.userService.getUser(),
        Some(
          new Candidate(
            Some('123'),
            Some('Bship'),
            Some('123456789'),
            Some('#1337'),
            Some('https://dto9r5vaiz7bu.cloudfront.net/bj7w80a5h2mic/source.png'),
            Some(new Group(Some('1'), Some('Master Commander'), Some('#ff0000'))),
            Some(new StarCitizenUser(
              Some('123456'),
              Some('Bship'),
              Some('Bship'),
              Some('Bship'),
              Some(moment()),
              Some('Colorado'),
              Some('English'),
              Some('faithfulknights.com'),
              Some('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus ducimus molestiae porro quas. Autem delectus dicta, dolores doloribus et hic in incidunt possimus provident quos similique sunt veniam veritatis voluptatum. Alias aliquid animi corporis deserunt distinctio enim hic ipsa laborum, minus mollitia nulla omnis quas quasi\n' +
                '  quidem, sed sequi similique, suscipit totam vitae voluptate! A aliquid aspernatur blanditiis delectus dolor. Accusantium ad aliquid architecto culpa dolores ea earum eos esse eum facilis harum in inventore ipsa iure laborum\n' +
                '  natus quae quasi, quos recusandae rem rerum unde ut voluptatem! Officia, officiis.'),
              Set.of(
                new StarCitizenOrganisation(
                  Some('FFK'),
                  Some('Fleet of the Faithful Knights'),
                  Some(true),
                  Some('Master Commander'),
                  Some(6),
                  Some('Organization'),
                  Some('English'),
                  Some('Social'),
                  Some(true),
                  Some('Security'),
                  Some(false),
                  Some('Regular'),
                  Some(false),
                ),
              ),
            )),
          ),
        ),
        Some(new Group(Some('2'), Some('Developer'), Some('#ff00ff'))),
        Some('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus ducimus molestiae porro quas. Autem delectus dicta, dolores doloribus et hic in incidunt possimus provident quos similique sunt veniam veritatis voluptatum. Alias aliquid animi corporis deserunt distinctio enim hic ipsa laborum, minus mollitia nulla omnis quas quasi\n' +
          '  quidem, sed sequi similique, suscipit totam vitae voluptate! A aliquid aspernatur blanditiis delectus dolor. Accusantium ad aliquid architecto culpa dolores ea earum eos esse eum facilis harum in inventore ipsa iure laborum\n' +
          '  natus quae quasi, quos recusandae rem rerum unde ut voluptatem! Officia, officiis.'),
        Set.of(
          new Ballot(
            Some('1'),
            this.userService.getUser(),
            Some('Y'),
            Some('I approve of this vote as this dude is a good fit'),
            Some(moment()),
            Some(moment()),
          ),
        ),
      ),
    );
  }

  getVoteDescription(): Option<string> {
    return this.getVote()
      .flatMap(v => v.getDescription());
  }

  getVoteSponsorUsername(): Option<string> {
    return this.getVote()
      .flatMap(v => v.getSponsorUsername());
  }

  ngOnInit(): void {
  }

  shouldShowVoteView(): boolean {
    return this.showVoteView
      .getValue() === true;
  }

}
