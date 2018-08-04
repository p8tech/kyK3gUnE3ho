this["Templates"] = this["Templates"] || {};

this["Templates"]["country"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"country-container\">\n  <div class=\"results-country show-div\">\n    <div class=\"div-country\" colspan=\"5\">\n      "
    + escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"title","hash":{},"data":data}) : helper)))
    + "\n    </div>\n  </div>\n\n  <div class=\"results-container inner-show\" id=\"results-entry\">\n    ";
  stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"content","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n\n  </div>\n</div>\n";
},"useData":true});

this["Templates"]["results-entry"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "<i class=\"winner\"></i>";
  },"3":function(depth0,helpers,partials,data) {
  return "score-winner";
  },"5":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <div class=\"set-number\">\n              "
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\n            </div>\n";
},"7":function(depth0,helpers,partials,data) {
  var stack1, buffer = "            <div class=\"team1\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.periods : depth0), {"name":"each","hash":{},"fn":this.program(8, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "              \n            </div>\n            <div class=\"team2\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.periods : depth0), {"name":"each","hash":{},"fn":this.program(10, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            </div>\n";
},"8":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "                <div class=\"score-number ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.winnerA : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\">\n                  "
    + escapeExpression(((helper = (helper = helpers.scoreA || (depth0 != null ? depth0.scoreA : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"scoreA","hash":{},"data":data}) : helper)))
    + "\n                </div>\n";
},"10":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "                <div class=\"score-number  ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.winnerB : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\">\n                  "
    + escapeExpression(((helper = (helper = helpers.scoreB || (depth0 != null ? depth0.scoreB : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"scoreB","hash":{},"data":data}) : helper)))
    + "\n                </div>\n";
},"12":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <div class=\"score-unavailable\">"
    + escapeExpression(((helper = (helper = helpers['score-unavailable'] || (depth0 != null ? depth0['score-unavailable'] : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"score-unavailable","hash":{},"data":data}) : helper)))
    + "</div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"parent-results-entry\">\n  <div class=\"results-entry show-div\">\n    <div class=\"col-date\">\n      "
    + escapeExpression(((helper = (helper = helpers.eventDate || (depth0 != null ? depth0.eventDate : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"eventDate","hash":{},"data":data}) : helper)))
    + "\n    </div>\n    <div class=\"col-event\">\n      "
    + escapeExpression(((helper = (helper = helpers.opponentA || (depth0 != null ? depth0.opponentA : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"opponentA","hash":{},"data":data}) : helper)))
    + " ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.winnerA : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += " \n    </div>\n    <div class=\"col-score\">\n      "
    + escapeExpression(((helper = (helper = helpers.scoreA || (depth0 != null ? depth0.scoreA : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"scoreA","hash":{},"data":data}) : helper)))
    + " - "
    + escapeExpression(((helper = (helper = helpers.scoreB || (depth0 != null ? depth0.scoreB : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"scoreB","hash":{},"data":data}) : helper)))
    + " \n    </div>\n    <div class=\"col-event\">\n      "
    + escapeExpression(((helper = (helper = helpers.opponentB || (depth0 != null ? depth0.opponentB : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"opponentB","hash":{},"data":data}) : helper)))
    + " ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.winnerB : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n    </div>\n  </div>\n\n  <div class=\"inner-show\">\n    <div class=\"score-sets\">\n      <div class=\"score-team1 ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.winnerA : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\">\n        "
    + escapeExpression(((helper = (helper = helpers.scoreA || (depth0 != null ? depth0.scoreA : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"scoreA","hash":{},"data":data}) : helper)))
    + "\n      </div>\n      <div class=\"score-div\">\n        <div class=\"score-title score-sheet col-"
    + escapeExpression(((helper = (helper = helpers.periodCount || (depth0 != null ? depth0.periodCount : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"periodCount","hash":{},"data":data}) : helper)))
    + "\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.periods : depth0), {"name":"each","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "        </div>\n        <div class=\"score-sheet col-"
    + escapeExpression(((helper = (helper = helpers.periodCount || (depth0 != null ? depth0.periodCount : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"periodCount","hash":{},"data":data}) : helper)))
    + "\">\n          <div class=\"score-bg\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.periodCount : depth0), {"name":"if","hash":{},"fn":this.program(7, data),"inverse":this.program(12, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "          </div>\n        </div>\n      </div>\n      <div class=\"score-team2 ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.winnerB : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\">\n        "
    + escapeExpression(((helper = (helper = helpers.scoreB || (depth0 != null ? depth0.scoreB : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"scoreB","hash":{},"data":data}) : helper)))
    + " \n      </div>\n    </div>\n  </div>\n</div>\n";
},"useData":true});