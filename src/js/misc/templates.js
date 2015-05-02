this["GoodLuckSoup"] = this["GoodLuckSoup"] || {};
this["GoodLuckSoup"]["templates"] = this["GoodLuckSoup"]["templates"] || {};
this["GoodLuckSoup"]["templates"]["end"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<div class='end'>\n	<div class='logo-lady'>\n		<img src='assets/img/lady.png'>\n	</div>\n	<div class='end-stories'>\n		<p>View more stories</p>\n		<div class='end-stories-choices center-text'>\n			<div class='btn' data-action='new-chapters'>\n				Generate new chapters\n			</div>\n			<span>or</span>\n			<div class='btn' data-action='database'>\n				View full database\n			</div>\n		</div>\n	</div>\n	\n	<div class='divider'></div>\n\n	<div class='end-other'>\n		<p>\n			Check out the feature length film \"Good Luck Soup,\" a companion to the interactive. Watch the trailer <a href='#'>here</a>. We are constantly looking to grow this collection of experiences and stories. <a href='http://goodlucksoup.com/contribute.html'>Contribute</a> your own.\n		</p>\n		<p>\n			Share this experience via <a href='#' class='twitter'>Twitter</a> or <a href='#' class='facebook'>Facebook</a>.\n		</p>\n	</div>\n</div>";
  },"useData":true});
this["GoodLuckSoup"]["templates"]["intro-video"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<video class='video-bg' autoplay loop id='video-intro-"
    + escapeExpression(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"index","hash":{},"data":data}) : helper)))
    + "'>\n	<source src='assets/video/intro/intro-"
    + escapeExpression(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"index","hash":{},"data":data}) : helper)))
    + ".mp4' type='video/mp4'>\n	<source src='assets/video/intro/intro-"
    + escapeExpression(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"index","hash":{},"data":data}) : helper)))
    + ".webm' type='video/webm'>\n</video>";
},"useData":true});
this["GoodLuckSoup"]["templates"]["story-content"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class='story-content story-content-"
    + escapeExpression(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"index","hash":{},"data":data}) : helper)))
    + "'>\n	<div class='story-top' data-index='"
    + escapeExpression(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"index","hash":{},"data":data}) : helper)))
    + "'>\n		<div class='story-top-bg story-top-bg-"
    + escapeExpression(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"index","hash":{},"data":data}) : helper)))
    + "'>\n			<div class='overlay-pattern'></div>\n		</div>\n		<div class='story-top-prev off'><div class='btn btn-prev'>&uarr;</div></div>\n		<div class='story-top-next'>Next chapter</div>\n		<div class='story-top-text off'>\n			<div class='story-top-overline'>Part "
    + escapeExpression(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"index","hash":{},"data":data}) : helper)))
    + "<span></span> of 7</div>\n			<div class='story-top-hed'>"
    + escapeExpression(((helper = (helper = helpers.hed || (depth0 != null ? depth0.hed : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"hed","hash":{},"data":data}) : helper)))
    + "</div>\n		</div>\n	</div>\n	<div class='story-bottom'>\n		<div class='story-content-template'></div>\n	</div>\n</div>";
},"useData":true});
this["GoodLuckSoup"]["templates"]["story-template-audio"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "			<p class='story-content-img-caption'>"
    + escapeExpression(((helper = (helper = helpers.image_caption || (depth0 != null ? depth0.image_caption : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"image_caption","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class='template-text-img'>\n	<p class='story-content-user'>By <span class='user-name'>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</span> <span class='user-divider'>&bull;</span> <span class='user-date'>"
    + escapeExpression(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"date","hash":{},"data":data}) : helper)))
    + "</span></p>\n	<h2 class='story-content-hed'><span>"
    + escapeExpression(((helper = (helper = helpers.hed || (depth0 != null ? depth0.hed : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"hed","hash":{},"data":data}) : helper)))
    + "</span></h2>\n	<div class='story-content-img-outer'>\n		<div class='story-content-img-inner'>\n			<img class='main-img' src='http://goodlucksoup.com/uploaded-images/"
    + escapeExpression(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"image","hash":{},"data":data}) : helper)))
    + "'>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.image_caption : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "			<div class='story-content-audio'>\n				<div class='audio-player'>\n					<div class='audio-player-progress'></div>\n					<div class='audio-player-btn btn' data-src='"
    + escapeExpression(((helper = (helper = helpers.media || (depth0 != null ? depth0.media : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"media","hash":{},"data":data}) : helper)))
    + "'>\n						<span class='icon-play'><img src='assets/img/icons/play.svg'></span>\n						<span class='icon-pause hide'><img src='assets/img/icons/pause.svg'></span>\n					</div>\n				</div>\n			</div>\n		</div>\n	</div>\n</div>";
},"useData":true});
this["GoodLuckSoup"]["templates"]["story-template-text-img"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "	<div class='story-content-img-outer'>\n		<div class='story-content-img-inner'>\n			<img class='main-img' src='http://goodlucksoup.com/uploaded-images/"
    + escapeExpression(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"image","hash":{},"data":data}) : helper)))
    + "'>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.image_caption : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "		</div>\n	</div>\n";
},"2":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "			<p class='story-content-img-caption'>"
    + escapeExpression(((helper = (helper = helpers.image_caption || (depth0 != null ? depth0.image_caption : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"image_caption","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class='template-text-img'>\n	<p class='story-content-user'>By <span class='user-name'>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</span> <span class='user-divider'>&bull;</span> <span class='user-date'>"
    + escapeExpression(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"date","hash":{},"data":data}) : helper)))
    + "</span></p>\n	<h2 class='story-content-hed'><span>"
    + escapeExpression(((helper = (helper = helpers.hed || (depth0 != null ? depth0.hed : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"hed","hash":{},"data":data}) : helper)))
    + "</span></h2>\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.image : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "	<div class='story-content-text'>";
  stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"content","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div>\n</div>";
},"useData":true});
this["GoodLuckSoup"]["templates"]["story-template-video"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class='template-video'>\n	<p class='story-content-user'>By <span class='user-name'>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</span> <span class='user-divider'>&bull;</span> <span class='user-date'>"
    + escapeExpression(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"date","hash":{},"data":data}) : helper)))
    + "</span></p>\n	<h2 class='story-content-hed'><span>"
    + escapeExpression(((helper = (helper = helpers.hed || (depth0 != null ? depth0.hed : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"hed","hash":{},"data":data}) : helper)))
    + "</span></h2>\n	<div class='story-content-video' data-media='"
    + escapeExpression(((helper = (helper = helpers.media || (depth0 != null ? depth0.media : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"media","hash":{},"data":data}) : helper)))
    + "'>\n	</div>\n</div>";
},"useData":true});